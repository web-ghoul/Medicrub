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
exports.AddDriverLicense = exports.GetDriver = exports.CheckDriver = void 0;
const model_1 = require("../model");
const config_1 = require("../config");
const FilesExtractor_1 = require("../middlewares/FilesExtractor");
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
                path: 'car',
                model: 'Car',
                populate: {
                    path: 'carAlbum',
                    model: 'CarAlbum',
                },
            })
                .populate('driverLicense');
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
                .select('-car -user')
                .populate('location')
                .populate('driverLicense')
                .populate('nationalCard');
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
                .select('driverLicense')
                .populate('driverLicense');
            if (driver) {
                /* -------------------------- Extract License Data -------------------------- */
                const images = yield (0, FilesExtractor_1.ExtractFiles)(req);
                const front = images['front'][0];
                const back = images['back'][0];
                if (front && back) {
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
exports.AddDriverLicense = AddDriverLicense;
