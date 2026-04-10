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
exports.UpdateDriverStatus = exports.UpdateDriverPosition = exports.AddDriverLicense = exports.GetDriver = exports.CheckDriver = void 0;
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const config_1 = require("../config");
const FilesExtractor_1 = require("../middlewares/FilesExtractor");
const model_1 = require("../model");
const SockerIO_1 = require("../services/SockerIO");
const UploadService_1 = require("../services/UploadService");
/* -------------------------------------------------------------------------- */
/*              Check Driver License , Car , Verification Status              */
/* -------------------------------------------------------------------------- */
const CheckDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const driver = yield model_1.Driver.findById(driverPayload.driverID)
                .populate({
                path: "car",
                model: "Car",
                populate: {
                    path: "carAlbum",
                    model: "CarAlbum",
                },
            })
                .populate("driverLicense");
            if (driver) {
                const result = {
                    _id: driverPayload._id,
                    driverID: driverPayload.driverID,
                    verified: driver.verified,
                    hasCar: driver.car != null,
                    hasCarAlbum: ((_a = driver.car) === null || _a === void 0 ? void 0 : _a.carAlbum) != null,
                    hasDriverLicense: driver.driverLicense != null,
                };
                return res.status(200).json({ data: result });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CheckDriver = CheckDriver;
/* -------------------------------------------------------------------------- */
/*                                 Get Driver                                 */
/* -------------------------------------------------------------------------- */
const GetDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const driver = yield model_1.Driver.findById(driverPayload.driverID)
                .select("-car")
                .populate({
                path: "user",
                select: "firstName lastName profileImage phone email",
            })
                .populate("location")
                .populate("driverLicense")
                .populate("nationalCard");
            if (driver) {
                return res.status(200).json({ data: driver });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetDriver = GetDriver;
/* -------------------------------------------------------------------------- */
/*                             Add Driver License                             */
/* -------------------------------------------------------------------------- */
const AddDriverLicense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const driver = yield model_1.Driver.findById(driverPayload.driverID)
                .select("driverLicense")
                .populate("driverLicense");
            if (driver) {
                /* -------------------------- Extract License Data -------------------------- */
                const images = yield (0, FilesExtractor_1.ExtractFiles)(req);
                const front = images["front"][0];
                const back = images["back"][0];
                if (front && back) {
                    /* -------------------------- Upload Files -------------------------- */
                    const frontURL = yield (0, UploadService_1.UploadFile)(front);
                    const backURL = yield (0, UploadService_1.UploadFile)(back);
                    /* -------------------------- Create License -------------------------- */
                    const license = yield model_1.License.create({
                        front: frontURL,
                        back: backURL,
                        type: "driver_license",
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
exports.AddDriverLicense = AddDriverLicense;
/* -------------------------------------------------------------------------- */
/*                           Update Driver Position                           */
/* -------------------------------------------------------------------------- */
const UpdateDriverPosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const locationInputs = (0, class_transformer_1.plainToClass)(dto_1.LocationInput, req.body);
            const errors = yield (0, class_validator_1.validate)(locationInputs);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            /* ------------------------------ Get Driver ----------------------------- */
            var driver = yield model_1.Driver.findById("65e867ce229ba794e7f3d558")
                .select("user location visible onTrip")
                .populate({
                path: "user",
                select: "firstName lastName profileImage",
            })
                .populate("location");
            /* ------------------------------ Driver Exist ------------------------------ */
            console.log(driver);
            if (driver) {
                /* ----------------------------- Update Location ---------------------------- */
                if (driver.location != null) {
                    driver.location.latitude = locationInputs.latitude;
                    driver.location.longitude = locationInputs.longitude;
                    driver.location.address = locationInputs.address;
                    driver.location.coordinates = [
                        parseFloat(locationInputs.longitude),
                        parseFloat(locationInputs.latitude),
                    ];
                    yield driver.location.save();
                }
                else {
                    /* ------------------------- Create New Location Obj ------------------------ */
                    const newLocation = yield model_1.MedicurbLocation.create({
                        latitude: locationInputs.latitude,
                        longitude: locationInputs.longitude,
                        address: locationInputs.address,
                        coordinates: [
                            parseFloat(locationInputs.longitude),
                            parseFloat(locationInputs.latitude),
                        ],
                    });
                    driver.location = newLocation;
                    driver = yield driver.save();
                }
                /* ------------------------------ Notify Admins ----------------------------- */
                console.log(driver);
                (0, SockerIO_1.getIO)().of("/admin").emit(config_1.DRIVERS_SOCKET_CHANNEL, driver);
                console.log(driver);
            }
            return res.status(201).json({ data: driver });
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.UpdateDriverPosition = UpdateDriverPosition;
/* -------------------------------------------------------------------------- */
/*                           Update Driver Status                           */
/* -------------------------------------------------------------------------- */
const UpdateDriverStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const statusInputs = (0, class_transformer_1.plainToClass)(dto_1.DriverUpdateStatusInput, req.body);
            const errors = yield (0, class_validator_1.validate)(statusInputs);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            /* ------------------------------ Get Driver ----------------------------- */
            var driver = yield model_1.Driver.findById(driverPayload.driverID)
                .select("user location visible onTrip")
                .populate({
                path: "user",
                select: "firstName lastName profileImage",
            })
                .populate("location");
            /* ------------------------------ Driver Exist ------------------------------ */
            if (driver) {
                driver.visible = statusInputs.isVisible;
                driver.onTrip = statusInputs.onTrip;
                driver = yield driver.save();
                /* ------------------------------ Notify Admins ----------------------------- */
                (0, SockerIO_1.getIO)().of("/admin").emit(config_1.DRIVERS_SOCKET_CHANNEL, driver);
            }
            return res.status(201).json({ data: null });
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.UpdateDriverStatus = UpdateDriverStatus;
