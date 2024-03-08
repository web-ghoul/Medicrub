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
exports.GetMyCar = exports.AddCarAlbum = exports.CreateCar = void 0;
const dto_1 = require("../dto");
const model_1 = require("../model");
const config_1 = require("../config");
const FilesExtractor_1 = require("../middlewares/FilesExtractor");
const UploadService_1 = require("../services/UploadService");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/* -------------------------------------------------------------------------- */
/*                               Create New Car                               */
/* -------------------------------------------------------------------------- */
const CreateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            /* ----------------------------- Validate Inputs ---------------------------- */
            const [fields, images] = yield (0, FilesExtractor_1.ExtractForm)(req);
            const registration = images['registration'][0];
            const insurance = images['insurance'][0];
            const carInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateCarInput, fields);
            const errors = yield (0, class_validator_1.validate)(carInputs);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            const driver = yield model_1.Driver.findById(driverPayload.driverID).select('car');
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
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CreateCar = CreateCar;
/* -------------------------------------------------------------------------- */
/*                                Add Car Album                               */
/* -------------------------------------------------------------------------- */
const AddCarAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            /* ----------------------------- Validate Inputs ---------------------------- */
            const images = yield (0, FilesExtractor_1.ExtractFiles)(req);
            const front = images['front'][0];
            const back = images['back'][0];
            const right = images['right'][0];
            const left = images['left'][0];
            const car = yield model_1.Car.findOne({ driver: driverPayload.driverID });
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
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.AddCarAlbum = AddCarAlbum;
/* -------------------------------------------------------------------------- */
/*                                 Get My Car                                 */
/* -------------------------------------------------------------------------- */
const GetMyCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverPayload = req.user;
        if (driverPayload) {
            const car = yield model_1.Car.findOne({ driver: driverPayload.driverID }).populate('carAlbum');
            if (car) {
                return res.status(200).json({ data: car });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetMyCar = GetMyCar;
