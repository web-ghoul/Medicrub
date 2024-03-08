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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyDriver = exports.GetAllCars = exports.GetNearestDriver = exports.GetPendingDrivers = exports.GetAllDrivers = exports.AdminDriverCarDetails = exports.AdminCreateCarAlbum = exports.AdminCreateCar = exports.AdminUpdateDriver = exports.AdminGetDriver = exports.AdminAddDriverLicense = exports.AdminCreateDriver = exports.AdminLogin = exports.CreateAdmin = void 0;
const model_1 = require("../model");
const config_1 = require("../config");
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const PasswordUtiility_1 = require("../utility/PasswordUtiility");
const TokenUtility_1 = require("../utility/TokenUtility");
const FilesExtractor_1 = require("../middlewares/FilesExtractor");
const UploadService_1 = require("../services/UploadService");
/* -------------------------------------------------------------------------- */
/*                              Create New Admin                              */
/* -------------------------------------------------------------------------- */
const CreateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                /* ----------------------------- Validate Inputs ---------------------------- */
                const adminInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateAdminInput, req.body);
                const errors = yield (0, class_validator_1.validate)(adminInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                const existAdmin = yield model_1.Admin.findOne({ username: adminInputs.username });
                if (existAdmin) {
                    return res.status(400).json({ message: config_1.USERNAME_EXIST_ERROR_MSG });
                }
                /* ------------------------------ Hash Password ----------------------------- */
                const salt = yield (0, PasswordUtiility_1.GenerateSalt)();
                const hashedPassword = yield (0, PasswordUtiility_1.GeneratePassword)(adminInputs.password, salt);
                /* ---------------------------- Create New Admin ---------------------------- */
                const newAdmin = yield model_1.Admin.create({
                    name: adminInputs.name,
                    username: adminInputs.username,
                    salt: salt,
                    password: hashedPassword,
                });
                if (newAdmin) {
                    return res.status(201).json({ data: newAdmin });
                }
            }
        }
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CreateAdmin = CreateAdmin;
/* -------------------------------------------------------------------------- */
/*                                 Admin Login                                */
/* -------------------------------------------------------------------------- */
const AdminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* ----------------------------- Validate Inputs ---------------------------- */
        const adminInputs = (0, class_transformer_1.plainToClass)(dto_1.LoginInput, req.body);
        const errors = yield (0, class_validator_1.validate)(adminInputs);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const admin = yield model_1.Admin.findOne({ username: adminInputs.username });
        if (admin) {
            const validPassword = yield (0, PasswordUtiility_1.ValidatePassword)(adminInputs.password, admin.password, admin.salt);
            if (validPassword) {
                const token = (0, TokenUtility_1.GenerateSignature)({
                    _id: admin._id,
                    username: admin.username,
                });
                return res.status(201).json({ token: token });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminLogin = AdminLogin;
/* -------------------------------------------------------------------------- */
/*                              Create New Driver                             */
/* -------------------------------------------------------------------------- */
const AdminCreateDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const [fields, images] = yield (0, FilesExtractor_1.ExtractForm)(req);
                /* ------------------------------ Check Inputs ------------------------------ */
                const driverInputs = (0, class_transformer_1.plainToClass)(dto_1.DriverRegisterInput, fields);
                const errors = yield (0, class_validator_1.validate)(driverInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                if (!images['profile'] || !images['nationalFront'] || !images['nationalBack']) {
                    return res.status(400).json({ message: config_1.REQUIREMENTS_ERROR_MSG });
                }
                const profile = images['profile'][0];
                const nationalFront = images['nationalFront'][0];
                const nationalBack = images['nationalBack'][0];
                if (profile && nationalFront && nationalBack) {
                    /* ----------------------- Check If User Already Exist ---------------------- */
                    const existUser = yield model_1.User.findOne({ "email": driverInputs.email.replace(/ /g, "") });
                    if (existUser) {
                        return res.status(400).json({ message: config_1.EMAIL_EXIST_ERROR_MSG });
                    }
                    /* ------------------------------ Upload Media ------------------------------ */
                    const prifileURL = yield (0, UploadService_1.UploadFile)(profile);
                    const nationalFrontURL = yield (0, UploadService_1.UploadFile)(nationalFront);
                    const nationalBackURL = yield (0, UploadService_1.UploadFile)(nationalBack);
                    /* ------------------------------ Hash Password ----------------------------- */
                    const salt = yield (0, PasswordUtiility_1.GenerateSalt)();
                    const hashedPassword = yield (0, PasswordUtiility_1.GeneratePassword)(driverInputs.password, salt);
                    /* --------------------------- Create New Location -------------------------- */
                    const userLocation = yield model_1.MedicurbLocation.create({
                        latitude: driverInputs.latitude,
                        longitude: driverInputs.longitude,
                        address: driverInputs.address,
                        coordinates: [
                            parseFloat(driverInputs.longitude),
                            parseFloat(driverInputs.latitude),
                        ],
                    });
                    /* --------------------------- Create New User --------------------------- */
                    const user = yield model_1.User.create({
                        firstName: driverInputs.firstName,
                        lastName: driverInputs.lastName,
                        birthDate: driverInputs.birthDate,
                        type: 'driver',
                        profileImage: prifileURL,
                        phone: driverInputs.phone.replace(/ /g, ""),
                        email: driverInputs.email.replace(/ /g, ""),
                        ssn: driverInputs.ssn,
                        medicalInsurance: driverInputs.medicalInsurance,
                        phoneVerified: false,
                        emailVerified: false,
                        salt: salt,
                        password: hashedPassword,
                        location: userLocation,
                    });
                    /* ------------------------ Create New National Cart ------------------------ */
                    const nationalCard = yield model_1.License.create({
                        type: 'national_card',
                        front: nationalFrontURL,
                        back: nationalBackURL,
                    });
                    /* ---------------------------- Create New Driver --------------------------- */
                    const driver = yield model_1.Driver.create({
                        user: user,
                        verified: false,
                        visible: false,
                        onTrip: false,
                        location: userLocation,
                        nationalCard: nationalCard,
                    });
                    /* ---------------------------- Assign The Driver To The User --------------------------- */
                    user.driver = driver;
                    yield user.save();
                    return res.status(201).json({ data: driver });
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminCreateDriver = AdminCreateDriver;
/* -------------------------------------------------------------------------- */
/*                              Add Driver License                            */
/* -------------------------------------------------------------------------- */
const AdminAddDriverLicense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const driverID = req.query.id;
                const driver = yield model_1.Driver.findById(driverID)
                    .select('driverLicense')
                    .populate('driverLicense');
                if (driver) {
                    /* -------------------------- Extract License Data -------------------------- */
                    const images = yield (0, FilesExtractor_1.ExtractFiles)(req);
                    if (!images['front'] || !images['back']) {
                        return res.status(400).json({ message: config_1.REQUIREMENTS_ERROR_MSG });
                    }
                    const front = images['front'][0];
                    const back = images['back'][0];
                    /* -------------------------- Upload Files -------------------------- */
                    const frontURL = yield (0, UploadService_1.UploadFile)(front);
                    const backURL = yield (0, UploadService_1.UploadFile)(back);
                    /* -------------------------- Create License -------------------------- */
                    const license = yield model_1.License.create({
                        front: frontURL,
                        back: backURL,
                        type: 'driver_license',
                    });
                    if (license) {
                        driver.driverLicense = license;
                        yield driver.save();
                        return res.status(201).json({ data: license });
                    }
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminAddDriverLicense = AdminAddDriverLicense;
/* -------------------------------------------------------------------------- */
/*                             Get Driver Details                             */
/* -------------------------------------------------------------------------- */
const AdminGetDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const driverID = req.query.id;
                const driver = yield model_1.Driver.findById(driverID)
                    .populate({
                    path: 'user',
                    populate: 'location'
                })
                    .populate({
                    path: 'car',
                    populate: 'carAlbum'
                })
                    .populate('location')
                    .populate('driverLicense')
                    .populate('nationalCard');
                if (driver) {
                    return res.status(200).json({ data: driver });
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminGetDriver = AdminGetDriver;
/* -------------------------------------------------------------------------- */
/*                                Update Driver                               */
/* -------------------------------------------------------------------------- */
const AdminUpdateDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const driverID = req.query.id;
                const [fields, images] = yield (0, FilesExtractor_1.ExtractForm)(req);
                /* ----------------------------- Validate Inputs ---------------------------- */
                const updateInputs = (0, class_transformer_1.plainToClass)(dto_1.DriverUpdateInput, fields);
                const errors = yield (0, class_validator_1.validate)(updateInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                /* ------------------------------- Get Driver ------------------------------- */
                const driver = yield model_1.Driver.findById(driverID)
                    .select('-location')
                    .populate({
                    path: 'user',
                    populate: 'location'
                })
                    .populate('driverLicense')
                    .populate('nationalCard');
                if (driver) {
                    let profile, nationalFront, nationalBack;
                    // let licenseFront, licenseBack;
                    /* ------------------------------ Profile Image ----------------------------- */
                    if (images['profile']) {
                        const file = images['profile'][0];
                        profile = yield (0, UploadService_1.UploadFile)(file);
                    }
                    /* ------------------------------ National Card ----------------------------- */
                    if (images['nationalFront']) {
                        const file = images['nationalFront'][0];
                        nationalFront = yield (0, UploadService_1.UploadFile)(file);
                    }
                    if (images['nationalBack']) {
                        const file = images['nationalBack'][0];
                        nationalBack = yield (0, UploadService_1.UploadFile)(file);
                    }
                    /* ----------------------------- Driver License ----------------------------- */
                    // if (images['licenseFront']) {
                    //     const file = images['licenseFront'][0] as formidable.File;
                    //     licenseFront = await UploadFile(file);
                    // }
                    // if (images['licenseBack']) {
                    //     const file = images['licenseBack'][0] as formidable.File;
                    //     licenseBack = await UploadFile(file);
                    // }
                    /* ------------------------------ Update Driver Details ----------------------------- */
                    driver.user.profileImage = profile !== null && profile !== void 0 ? profile : driver.user.profileImage;
                    driver.user.firstName = updateInputs.firstName;
                    driver.user.lastName = updateInputs.lastName;
                    driver.user.birthDate = updateInputs.birthDate;
                    driver.user.email = updateInputs.email;
                    driver.user.phone = updateInputs.phone;
                    driver.user.ssn = updateInputs.ssn;
                    driver.user.medicalInsurance = updateInputs.medicalInsurance;
                    driver.user.location.latitude = updateInputs.latitude;
                    driver.user.location.longitude = updateInputs.longitude;
                    driver.user.location.address = updateInputs.address;
                    /* -------------------------- Update Driver License ------------------------- */
                    // driver.driverLicense.front = licenseFront ?? driver.driverLicense.front;
                    // driver.driverLicense.back = licenseBack ?? driver.driverLicense.back;
                    /* ----------------------- Update Driver National Card ---------------------- */
                    driver.nationalCard.front = nationalFront !== null && nationalFront !== void 0 ? nationalFront : driver.nationalCard.front;
                    driver.nationalCard.back = nationalBack !== null && nationalBack !== void 0 ? nationalBack : driver.nationalCard.back;
                    /* ------------------------------ Save Updates ------------------------------ */
                    driver.updatedBy = admin;
                    yield driver.user.save();
                    yield driver.user.location.save();
                    yield driver.nationalCard.save();
                    // await driver.driverLicense.save();
                    yield driver.save();
                    return res.status(201).json({ data: driver });
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminUpdateDriver = AdminUpdateDriver;
/* -------------------------------------------------------------------------- */
/*                               Create New Car                               */
/* -------------------------------------------------------------------------- */
const AdminCreateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                /* ----------------------------- Validate Inputs ---------------------------- */
                const driverID = req.query.id;
                const [fields, images] = yield (0, FilesExtractor_1.ExtractForm)(req);
                const carInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateCarInput, fields);
                const errors = yield (0, class_validator_1.validate)(carInputs);
                if (errors.length > 0 || !driverID) {
                    return res.status(400).json(errors);
                }
                if (!images['registration'] || !images['insurance']) {
                    return res.status(400).json({ message: config_1.REQUIREMENTS_ERROR_MSG });
                }
                const registration = images['registration'][0];
                const insurance = images['insurance'][0];
                const driver = yield model_1.Driver.findById(driverID).select('car');
                if (driver) {
                    const registrationURL = yield (0, UploadService_1.UploadFile)(registration);
                    const insuranceURL = yield (0, UploadService_1.UploadFile)(insurance);
                    const car = yield model_1.Car.create({
                        driver: driver._id,
                        registration: registrationURL,
                        insurance: insuranceURL,
                        carType: carInputs.carType,
                        carModel: carInputs.carModel,
                        plateNum: carInputs.plateNum,
                        color: carInputs.color,
                    });
                    if (car) {
                        driver.car = car;
                        yield driver.save();
                        return res.status(201).json({ data: car });
                    }
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminCreateCar = AdminCreateCar;
/* -------------------------------------------------------------------------- */
/*                              Create Car Album                              */
/* -------------------------------------------------------------------------- */
const AdminCreateCarAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                /* ----------------------------- Validate Inputs ---------------------------- */
                const driverID = req.query.id;
                const images = yield (0, FilesExtractor_1.ExtractFiles)(req);
                if (!images['front'] ||
                    !images['back'] ||
                    !images['right'] ||
                    !images['left']) {
                    return res.status(400).json({ message: config_1.REQUIREMENTS_ERROR_MSG });
                }
                const front = images['front'][0];
                const back = images['back'][0];
                const right = images['right'][0];
                const left = images['left'][0];
                const car = yield model_1.Car.findOne({ driver: driverID });
                if (car) {
                    const frontURL = yield (0, UploadService_1.UploadFile)(front);
                    const backURL = yield (0, UploadService_1.UploadFile)(back);
                    const rightURL = yield (0, UploadService_1.UploadFile)(right);
                    const leftURL = yield (0, UploadService_1.UploadFile)(left);
                    const carAlbum = yield model_1.CarAlbum.create({
                        car: car,
                        front: frontURL,
                        back: backURL,
                        right: rightURL,
                        left: leftURL,
                    });
                    if (carAlbum) {
                        car.carAlbum = carAlbum;
                        yield car.save();
                        return res.status(201).json({ data: carAlbum });
                    }
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminCreateCarAlbum = AdminCreateCarAlbum;
/* -------------------------------------------------------------------------- */
/*                               Get Car Details                              */
/* -------------------------------------------------------------------------- */
const AdminDriverCarDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const driverID = req.query.id;
                const car = yield model_1.Car.findOne({ driver: driverID }).populate('carAlbum').populate('carAlbum');
                if (car) {
                    return res.status(200).json({ data: car });
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AdminDriverCarDetails = AdminDriverCarDetails;
/* -------------------------------------------------------------------------- */
/*                               Get All Drivers                              */
/* -------------------------------------------------------------------------- */
const GetAllDrivers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const page = (_a = Number.parseInt(req.params.page)) !== null && _a !== void 0 ? _a : 0;
                const driver = yield model_1.Driver.find({ verified: true })
                    .skip(config_1.PAGINATION_PAGE * page)
                    .limit(config_1.PAGINATION_PAGE)
                    .select('-car -nationalCard -driverLicense')
                    .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage phone email',
                })
                    .populate('location')
                    .sort('-createdAt');
                if (driver) {
                    return res.status(200).json({ data: driver });
                }
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetAllDrivers = GetAllDrivers;
/* -------------------------------------------------------------------------- */
/*                             Get Pending Drivers                            */
/* -------------------------------------------------------------------------- */
const GetPendingDrivers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const page = (_b = Number.parseInt(req.params.page)) !== null && _b !== void 0 ? _b : 0;
                const drivers = yield model_1.Driver.find({ verified: false })
                    .skip(config_1.PAGINATION_PAGE * page)
                    .limit(config_1.PAGINATION_PAGE)
                    .select('-car -nationalCard -driverLicense')
                    .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage phone email',
                })
                    .populate('location')
                    .sort('-createdAt');
                return res.status(200).json({ data: drivers });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetPendingDrivers = GetPendingDrivers;
/* -------------------------------------------------------------------------- */
/*                             Get Nearest Drivers                            */
/* -------------------------------------------------------------------------- */
const GetNearestDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                /* ----------------------------- Validate Inupts ---------------------------- */
                const latitude = parseFloat(String(req.query.latitude));
                const longitude = parseFloat(String(req.query.longitude));
                if (!longitude || !latitude) {
                    return res.status(400).json(null);
                }
                /* --------------------------- Get Nearest Drivers -------------------------- */
                const drivers = yield model_1.Driver.find({ verified: true })
                    .select('_id user location visible onTrip')
                    .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage phone email',
                })
                    .populate('location');
                let response = [];
                for (const driver of drivers) {
                    const distance = calculateDistanceInMiles(driver.location.coordinates[1], driver.location.coordinates[0], latitude, longitude);
                    response.push({
                        driver: driver,
                        distance: distance,
                    });
                }
                // Calculate distance and sort drivers based on the distance
                response.sort((a, b) => a.distance - b.distance);
                return res.status(200).json({ data: response });
            }
            return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetNearestDriver = GetNearestDriver;
function calculateDistanceInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
function toRad(degrees) {
    return degrees * Math.PI / 180;
}
/* -------------------------------------------------------------------------- */
/*                                Get All Cars                                */
/* -------------------------------------------------------------------------- */
const GetAllCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const page = Number.parseInt(req.params.page);
                const driver = yield model_1.Driver.find()
                    .skip(config_1.PAGINATION_PAGE * page)
                    .limit(config_1.PAGINATION_PAGE)
                    .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage phone email',
                })
                    .populate('location')
                    .populate('nationalCard')
                    .sort('-createdAt');
                if (driver) {
                    return res.status(200).json({ data: driver });
                }
            }
            return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetAllCars = GetAllCars;
/* -------------------------------------------------------------------------- */
/*                                Verify Driver                               */
/* -------------------------------------------------------------------------- */
const VerifyDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const driverID = req.query.id;
                var driver = yield model_1.Driver.findById(driverID).populate('car');
                /* -------------------------------------------------------------------------- */
                /*                          Check All Inputs Are Done                         */
                /* -------------------------------------------------------------------------- */
                /* ------------------------------ Car Validator ----------------------------- */
                if ((driver === null || driver === void 0 ? void 0 : driver.car) == null) {
                    return res.status(400).json({ message: config_1.NOT_COMPLETED_DATA_ERROR_MSG });
                }
                /* ------------------------------ Car Album Validator ----------------------------- */
                if (((_c = driver === null || driver === void 0 ? void 0 : driver.car) === null || _c === void 0 ? void 0 : _c.carAlbum) == null) {
                    return res.status(400).json({ message: config_1.NOT_COMPLETED_DATA_ERROR_MSG });
                }
                {
                    driver.verified = true;
                    driver.verifiedBy = admin;
                    yield driver.save();
                    return res.status(201).json({ data: null });
                }
            }
            return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.VerifyDriver = VerifyDriver;
