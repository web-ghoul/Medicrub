import { config } from "dotenv";
import mongoose from "mongoose";
import dbConnection from "./services/DBService";
import { Admin, User, Driver, MedicurbLocation, License, Car, Trip } from "./model";
import { GenerateSalt, GeneratePassword } from "./utility/PasswordUtiility";
import { faker } from "@faker-js/faker";

config();

const doSeed = async () => {
  try {
    console.log("Connecting to database...");
    await dbConnection(process.env.MONGO_URL!);
    console.log("Connected to MongoDB.");

    // Clear existing dynamic data (optional, comment out if you want to keep data)
    // console.log("Clearing existing data...");
    // await User.deleteMany({ type: { $ne: 'admin' } });
    // await Driver.deleteMany({});
    // await Car.deleteMany({});
    // await Trip.deleteMany({});
    // await MedicurbLocation.deleteMany({});

    // 1. Seed Admin
    let admin = await Admin.findOne({ username: "admin@gmail.com" });
    if (!admin) {
      console.log("Creating Admin user...");
      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword("123123123", salt);
      admin = await Admin.create({
        name: "admin",
        username: "admin@gmail.com",
        salt: salt,
        password: hashedPassword,
      });
      console.log("Admin user created.");
    }

    const salt = await GenerateSalt();
    const password = await GeneratePassword("123123123", salt);

    // 2. Seed 100 Locations around Cairo
    console.log("Seeding 100 Locations...");
    const seededLocations = [];
    for (let i = 0; i < 100; i++) {
        // Cairo region coordinates
        const lat = faker.location.latitude({ max: 30.15, min: 29.95 });
        const lng = faker.location.longitude({ max: 31.45, min: 31.15 });
        const loc = await MedicurbLocation.create({
            latitude: lat.toString(),
            longitude: lng.toString(),
            address: faker.location.streetAddress() + ", Cairo, Egypt",
            coordinates: [lng, lat]
        });
        seededLocations.push(loc);
    }

    // 3. Seed 100 Drivers
    console.log("Seeding 100 Drivers...");
    const license = await License.findOne({ type: "national_card" }) || await License.create({ 
        front: "https://via.placeholder.com/600x400?text=National+Card+Front", 
        back: "https://via.placeholder.com/600x400?text=National+Card+Back", 
        type: "national_card" 
    });

    const seededDrivers = [];
    for (let i = 0; i < 100; i++) {
        const email = faker.internet.email();
        const user = await User.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthDate: "1990-01-01",
            type: "driver",
            phone: faker.phone.number(),
            email: email,
            profileImage: `https://i.pravatar.cc/300?u=${email}`,
            location: seededLocations[i % seededLocations.length]._id,
            salt,
            password
        });
        
        const driver = await Driver.create({
            user: user._id,
            location: user.location,
            nationalCard: license._id,
            verified: true,
            visible: true,
            onTrip: false
        });

        user.driver = driver._id;
        await user.save();

        // Create Car for every driver
        await Car.create({
            driver: driver._id,
            carType: faker.vehicle.type(),
            carModel: faker.vehicle.model(),
            plateNum: faker.vehicle.vrm(),
            color: faker.color.human(),
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
        const email = faker.internet.email();
        const user = await User.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthDate: "1985-05-05",
            type: "patient",
            phone: faker.phone.number(),
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
        
        await Trip.create({
            driver: driver._id,
            patient: patient._id,
            pickup: patient.location,
            destination: dest._id,
            addedBy: admin._id,
            date: "2026-04-10",
            time: `${10 + (i % 8)}:00`, // Sample times between 10am and 6pm
            cost: faker.number.int({ min: 100, max: 1000 }),
            number: `TRIP-${2000 + i}`,
            specialNeeds: faker.helpers.arrayElement(["Wheelchair required", "Oxygen tank", "None", "None"])
        });
    }

    console.log("Massive seeding with real images completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:");
    console.error(error);
    process.exit(1);
  }
};

doSeed();
