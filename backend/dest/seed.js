"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const DBService_1 = __importDefault(require("./services/DBService"));
const model_1 = require("./model");
const PasswordUtiility_1 = require("./utility/PasswordUtiility");
const faker_1 = require("@faker-js/faker");
(0, dotenv_1.config)();
const doSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting to database...");
        yield (0, DBService_1.default)(process.env.MONGO_URL);
        console.log("Connected to MongoDB.");
        // Clear existing dynamic data (optional, comment out if you want to keep data)
        // console.log("Clearing existing data...");
        // await User.deleteMany({ type: { $ne: 'admin' } });
        // await Driver.deleteMany({});
        // await Car.deleteMany({});
        // await Trip.deleteMany({});
        // await MedicurbLocation.deleteMany({});
        // 1. Seed Admin
        let admin = yield model_1.Admin.findOne({ username: "admin@gmail.com" });
        if (!admin) {
            console.log("Creating Admin user...");
            const salt = yield (0, PasswordUtiility_1.GenerateSalt)();
            const hashedPassword = yield (0, PasswordUtiility_1.GeneratePassword)("123123123", salt);
            admin = yield model_1.Admin.create({
                name: "admin",
                username: "admin@gmail.com",
                salt: salt,
                password: hashedPassword,
            });
            console.log("Admin user created.");
        }
        const salt = yield (0, PasswordUtiility_1.GenerateSalt)();
        const password = yield (0, PasswordUtiility_1.GeneratePassword)("123123123", salt);
        // 2. Seed 100 Locations around Cairo
        console.log("Seeding 100 Locations...");
        const seededLocations = [];
        for (let i = 0; i < 100; i++) {
            // Cairo region coordinates
            const lat = faker_1.faker.location.latitude({ max: 30.15, min: 29.95 });
            const lng = faker_1.faker.location.longitude({ max: 31.45, min: 31.15 });
            const loc = yield model_1.MedicurbLocation.create({
                latitude: lat.toString(),
                longitude: lng.toString(),
                address: faker_1.faker.location.streetAddress() + ", Cairo, Egypt",
                coordinates: [lng, lat]
            });
            seededLocations.push(loc);
        }
        // 3. Seed 100 Drivers
        console.log("Seeding 100 Drivers...");
        const license = (yield model_1.License.findOne({ type: "national_card" })) || (yield model_1.License.create({
            front: "https://via.placeholder.com/600x400?text=National+Card+Front",
            back: "https://via.placeholder.com/600x400?text=National+Card+Back",
            type: "national_card"
        }));
        const seededDrivers = [];
        for (let i = 0; i < 100; i++) {
            const email = faker_1.faker.internet.email();
            const user = yield model_1.User.create({
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
                birthDate: "1990-01-01",
                type: "driver",
                phone: faker_1.faker.phone.number(),
                email: email,
                profileImage: `https://i.pravatar.cc/300?u=${email}`,
                location: seededLocations[i % seededLocations.length]._id,
                salt,
                password
            });
            const driver = yield model_1.Driver.create({
                user: user._id,
                location: user.location,
                nationalCard: license._id,
                verified: true,
                visible: true,
                onTrip: false
            });
            user.driver = driver._id;
            yield user.save();
            // Create Car for every driver
            yield model_1.Car.create({
                driver: driver._id,
                carType: faker_1.faker.vehicle.type(),
                carModel: faker_1.faker.vehicle.model(),
                plateNum: faker_1.faker.vehicle.vrm(),
                color: faker_1.faker.color.human(),
                registration: "https://via.placeholder.com/600x400?text=Car+Registration",
                insurance: "https://via.placeholder.com/600x400?text=Insurance",
                // Note: the model didn't have a carImage field, but if it did we'd use:
                // carImage: `https://loremflickr.com/640/480/car?lock=${i}`
            });
            seededDrivers.push(driver);
        }
        // 4. Seed 100 Patients
        console.log("Seeding 100 Patients...");
        const seededPatients = [];
        for (let i = 0; i < 100; i++) {
            const email = faker_1.faker.internet.email();
            const user = yield model_1.User.create({
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
                birthDate: "1985-05-05",
                type: "patient",
                phone: faker_1.faker.phone.number(),
                email: email,
                profileImage: `https://i.pravatar.cc/300?u=${email}`,
                location: seededLocations[Math.floor(Math.random() * seededLocations.length)]._id,
                salt,
                password
            });
            seededPatients.push(user);
        }
        // 5. Seed 100 Trips
        console.log("Seeding 100 Trips...");
        for (let i = 0; i < 100; i++) {
            const patient = seededPatients[i];
            const driver = seededDrivers[i % seededDrivers.length];
            const dest = seededLocations[Math.floor(Math.random() * seededLocations.length)];
            yield model_1.Trip.create({
                driver: driver._id,
                patient: patient._id,
                pickup: patient.location,
                destination: dest._id,
                addedBy: admin._id,
                date: "2026-04-10",
                time: `${10 + (i % 8)}:00`, // Sample times between 10am and 6pm
                cost: faker_1.faker.number.int({ min: 100, max: 1000 }),
                number: `TRIP-${2000 + i}`,
                specialNeeds: faker_1.faker.helpers.arrayElement(["Wheelchair required", "Oxygen tank", "None", "None"])
            });
        }
        console.log("Massive seeding with real images completed successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding the database:");
        console.error(error);
        process.exit(1);
    }
});
doSeed();
