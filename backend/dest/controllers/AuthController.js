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
exports.CheckEmailExist = exports.GetProfile = exports.DriverRegister = exports.Login = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const PasswordUtiility_1 = require("../utility/PasswordUtiility");
const dto_1 = require("../dto");
const TokenUtility_1 = require("../utility/TokenUtility");
const model_1 = require("../model");
const config_1 = require("../config");
const UploadService_1 = require("../services/UploadService");
const FilesExtractor_1 = require("../middlewares/FilesExtractor");
/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInputs = (0, class_transformer_1.plainToClass)(dto_1.LoginInput, req.body);
        const errors = yield (0, class_validator_1.validate)(loginInputs);
        if (errors.length > 0) {
            return res.status(200).json(errors);
        }
        const user = yield model_1.User
            .findOne({ "email": loginInputs.username.replace(/ /g, "") })
            .populate({
            path: 'driver',
            select: '-user -car -driverLicense -nationalCard',
        })
            .populate('location');
        if (user) {
            /* ---------------------------- Validate Password --------------------------- */
            const validPassword = yield (0, PasswordUtiility_1.ValidatePassword)(loginInputs.password, user.password, user.salt);
            if (validPassword) {
                /* ---------------------------- Generate Token --------------------------- */
                const token = (0, TokenUtility_1.GenerateSignature)({
                    _id: user._id,
                    driverID: user.driver._id,
                    verified: user.driver.verified,
                    hasCar: user.driver.car != null,
                    hasDriverLicense: user.driver.driverLicense != null,
                });
                return res.status(200).json({
                    data: {
                        user: user,
                        token: token,
                    }
                });
            }
        }
        return res.status(400).json({ message: config_1.LOGIN_FAIL_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.Login = Login;
/* -------------------------------------------------------------------------- */
/*                               Driver Register                              */
/* -------------------------------------------------------------------------- */
const DriverRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [fields, images] = yield (0, FilesExtractor_1.ExtractForm)(req);
        /* ------------------------------ Check Inputs ------------------------------ */
        const driverInputs = (0, class_transformer_1.plainToClass)(dto_1.DriverRegisterInput, fields);
        const errors = yield (0, class_validator_1.validate)(driverInputs);
        if (errors.length > 0) {
            return res.status(400).json(errors);
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
                user: user._id,
                verified: false,
                visible: false,
                onTrip: false,
                location: userLocation,
                nationalCard: nationalCard,
            });
            /* ---------------------------- Assign The Driver To The User --------------------------- */
            user.driver = driver;
            yield user.save();
            /* ---------------------------- Generate Token --------------------------- */
            const token = (0, TokenUtility_1.GenerateSignature)({
                _id: user._id,
                driverID: driver._id,
                verified: false,
                hasCar: false,
                hasDriverLicense: false,
            });
            return res.status(201).json({ data: { token: token } });
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.DriverRegister = DriverRegister;
/* -------------------------------------------------------------------------- */
/*                                 Get Profile                                */
/* -------------------------------------------------------------------------- */
const GetProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.user;
        if (userPayload) {
            const user = yield model_1.User.findById(userPayload._id).populate('location');
            if (user) {
                return res.status(400).json({ data: user });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetProfile = GetProfile;
/* -------------------------------------------------------------------------- */
/*                              Check Email Exist                             */
/* -------------------------------------------------------------------------- */
const CheckEmailExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield model_1.User.findOne({ email: email.replace(/ /g, "") });
        if (user) {
            return res.status(200).json({ data: true });
        }
        return res.status(200).json({ data: false });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CheckEmailExist = CheckEmailExist;
