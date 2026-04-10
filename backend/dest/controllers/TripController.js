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
exports.GetAllTrips = exports.UpdateTrip = exports.CreateMultiTrip = exports.CreateTrip = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../dto");
const model_1 = require("../model");
const config_1 = require("../config");
const PasswordUtiility_1 = require("../utility/PasswordUtiility");
const DateUtility_1 = require("../utility/DateUtility");
const addTrip = (admin, tripInputs) => __awaiter(void 0, void 0, void 0, function* () {
    /* ------------------------- Create PickUp Location ------------------------- */
    const pickupLocation = yield model_1.MedicurbLocation.create({
        latitude: tripInputs.pickup.latitude,
        longitude: tripInputs.pickup.longitude,
        address: tripInputs.pickup.address,
        coordinates: [
            parseFloat(tripInputs.pickup.longitude),
            parseFloat(tripInputs.pickup.latitude),
        ],
    });
    /* ------------------------- Create Destination Location ------------------------- */
    const destinationLocation = yield model_1.MedicurbLocation.create({
        latitude: tripInputs.destination.latitude,
        longitude: tripInputs.destination.longitude,
        address: tripInputs.destination.address,
        coordinates: [
            parseFloat(tripInputs.destination.longitude),
            parseFloat(tripInputs.destination.latitude),
        ],
    });
    /* --------------------- Check If Patient Already Exist --------------------- */
    var patient = yield model_1.User.findOne({ phone: tripInputs.phone, type: config_1.PATIENT });
    if (!patient) {
        /* ------------------------------ Hash Password ----------------------------- */
        const salt = yield (0, PasswordUtiility_1.GenerateSalt)();
        const hashedPassword = yield (0, PasswordUtiility_1.GeneratePassword)('hGYW72625CGDj', salt);
        const patientLocation = yield model_1.MedicurbLocation.create({
            latitude: tripInputs.pickup.latitude,
            longitude: tripInputs.pickup.longitude,
            address: tripInputs.pickup.address,
            coordinates: [
                parseFloat(tripInputs.pickup.longitude),
                parseFloat(tripInputs.pickup.latitude),
            ],
        });
        const patientObj = yield model_1.Patient.create({
            location: patientLocation,
        });
        /* --------------------------- Create New Patient --------------------------- */
        patient = yield model_1.User.create({
            firstName: tripInputs.firstName,
            lastName: tripInputs.lastName,
            birthDate: tripInputs.birthDate,
            type: config_1.PATIENT,
            phone: tripInputs.phone.replace(/ /g, ""),
            salt: salt,
            password: hashedPassword,
            location: patientLocation,
            patient: patientObj,
        });
    }
    /* ----------------------------- Create New Trip ---------------------------- */
    const trip = yield model_1.Trip.create({
        driver: tripInputs.driver,
        patient: patient,
        pickup: pickupLocation,
        destination: destinationLocation,
        cost: tripInputs.cost,
        date: (0, DateUtility_1.RemoveDateTime)(new Date(tripInputs.date)),
        time: tripInputs.time,
        type: tripInputs.type,
        addedBy: admin,
        number: tripInputs.number,
        specialNeeds: tripInputs.specialNeeds,
    });
    return trip;
});
/* -------------------------------------------------------------------------- */
/*                            Create Trip Manually                            */
/* -------------------------------------------------------------------------- */
const CreateTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const tripInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateTripInput, req.body);
                /* ----------------------------- Validate inputs ---------------------------- */
                const errors = yield (0, class_validator_1.validate)(tripInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }
                const trip = yield addTrip(admin, tripInputs);
                return res.status(201).json({ data: trip });
            }
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CreateTrip = CreateTrip;
/* -------------------------------------------------------------------------- */
/*                              Create Multi Trip                             */
/* -------------------------------------------------------------------------- */
const CreateMultiTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                if (req.body instanceof Array) {
                    /* ----------------------------- Extract Inputs ----------------------------- */
                    const validInputs = [];
                    /* ---------------------------- Run Inputs Validator --------------------------- */
                    for (const input of req.body) {
                        const tripInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateTripInput, input);
                        /* ----------------------------- Validate inputs ---------------------------- */
                        const errors = yield (0, class_validator_1.validate)(tripInputs);
                        if (errors.length > 0) {
                            return res.status(400).json(errors);
                        }
                        /* ------------------------- Add To Validated nputs ------------------------- */
                        validInputs.push(tripInputs);
                    }
                    /* -------------------------- Continue To Add Trips ------------------------- */
                    for (const tripInputs of validInputs) {
                        yield addTrip(admin, tripInputs);
                    }
                    /* ----------------------------- Return Response ---------------------------- */
                    return res.status(201).json({ data: null });
                }
                /* ------------------------- Invalid Request Object ------------------------- */
                return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
            }
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.CreateMultiTrip = CreateMultiTrip;
/* -------------------------------------------------------------------------- */
/*                                 Update Trip                                */
/* -------------------------------------------------------------------------- */
const UpdateTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const trip = yield model_1.Trip.findById(req.query.id)
                    .populate('pickup')
                    .populate('destination')
                    .populate({
                    path: 'patient',
                    populate: 'location',
                });
                if (trip) {
                    const tripInputs = (0, class_transformer_1.plainToClass)(dto_1.UpdateTripInput, req.body);
                    /* ---------------------- Check New Phone Already Used ---------------------- */
                    if (tripInputs.phone) {
                        const existPatient = yield model_1.User.findOne({ phone: tripInputs.phone.replace(/ /g, ""), });
                        if (existPatient) {
                            trip.patient = existPatient;
                        }
                        else {
                            trip.patient.phone = (_a = tripInputs.phone) !== null && _a !== void 0 ? _a : trip.patient.phone;
                        }
                    }
                    /* ----------------------------- Update Patient ----------------------------- */
                    trip.patient.firstName = (_b = tripInputs.firstName) !== null && _b !== void 0 ? _b : trip.patient.firstName;
                    trip.patient.lastName = (_c = tripInputs.lastName) !== null && _c !== void 0 ? _c : trip.patient.lastName;
                    /* ------------------------------ Update Driver ----------------------------- */
                    trip.driver = tripInputs.driver;
                    /* ------------------------------- Update Trip ------------------------------ */
                    trip.date = (0, DateUtility_1.RemoveDateTime)(new Date((_d = tripInputs.date) !== null && _d !== void 0 ? _d : String(trip.date)));
                    trip.time = (_e = tripInputs.time) !== null && _e !== void 0 ? _e : trip.time;
                    trip.cost = (_f = tripInputs.cost) !== null && _f !== void 0 ? _f : trip.cost;
                    trip.number = (_g = tripInputs.number) !== null && _g !== void 0 ? _g : trip.number;
                    trip.specialNeeds = (_h = tripInputs.specialNeeds) !== null && _h !== void 0 ? _h : trip.specialNeeds;
                    /* ------------------------------ Update Pick Up ----------------------------- */
                    var pickup = trip.pickup;
                    pickup.latitude = (_k = (_j = tripInputs.pickup) === null || _j === void 0 ? void 0 : _j.latitude) !== null && _k !== void 0 ? _k : trip.pickup.latitude;
                    pickup.longitude = (_m = (_l = tripInputs.pickup) === null || _l === void 0 ? void 0 : _l.longitude) !== null && _m !== void 0 ? _m : trip.pickup.longitude;
                    pickup.address = (_p = (_o = tripInputs.pickup) === null || _o === void 0 ? void 0 : _o.address) !== null && _p !== void 0 ? _p : trip.pickup.address;
                    pickup.coordinates = [
                        parseFloat((_r = (_q = tripInputs.pickup) === null || _q === void 0 ? void 0 : _q.longitude) !== null && _r !== void 0 ? _r : String(trip.pickup.longitude)),
                        parseFloat((_t = (_s = tripInputs.pickup) === null || _s === void 0 ? void 0 : _s.latitude) !== null && _t !== void 0 ? _t : String(trip.pickup.latitude)),
                    ];
                    /* --------------------------- Update Destination --------------------------- */
                    var destination = trip.destination;
                    destination.latitude = (_v = (_u = tripInputs.destination) === null || _u === void 0 ? void 0 : _u.latitude) !== null && _v !== void 0 ? _v : trip.destination.latitude;
                    destination.longitude = (_x = (_w = tripInputs.destination) === null || _w === void 0 ? void 0 : _w.longitude) !== null && _x !== void 0 ? _x : trip.destination.longitude;
                    destination.address = (_z = (_y = tripInputs.destination) === null || _y === void 0 ? void 0 : _y.address) !== null && _z !== void 0 ? _z : trip.destination.address;
                    destination.coordinates = [
                        parseFloat((_1 = (_0 = tripInputs.destination) === null || _0 === void 0 ? void 0 : _0.longitude) !== null && _1 !== void 0 ? _1 : String(trip.destination.longitude)),
                        parseFloat((_3 = (_2 = tripInputs.destination) === null || _2 === void 0 ? void 0 : _2.latitude) !== null && _3 !== void 0 ? _3 : String(trip.destination.latitude)),
                    ];
                    /* ------------------------------ Save Updates ------------------------------ */
                    trip.updatedBy = admin;
                    yield pickup.save();
                    yield destination.save();
                    yield trip.patient.save();
                    yield trip.save();
                    return res.status(201).json({ data: null });
                }
            }
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.UpdateTrip = UpdateTrip;
/* -------------------------------------------------------------------------- */
/*                                Get All Trips                               */
/* -------------------------------------------------------------------------- */
const GetAllTrips = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _4;
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                const page = Number.parseInt(req.params.page);
                const date = (0, DateUtility_1.RemoveDateTime)(new Date(String((_4 = req.query.date) !== null && _4 !== void 0 ? _4 : '')));
                console.log(date);
                const total = yield model_1.Trip.countDocuments({ date: date });
                const trips = yield model_1.Trip.find({ date: date })
                    .skip(config_1.PAGINATION_PAGE * page)
                    .limit(config_1.PAGINATION_PAGE)
                    .populate('pickup')
                    .populate('destination')
                    .populate({
                    path: 'patient',
                    select: 'firstName lastName profileImage email phone'
                })
                    .populate({
                    path: 'driver',
                    select: '_id user',
                    populate: {
                        path: 'user',
                        select: "firstName lastName profileImage email phone",
                    }
                })
                    .sort('-createdAt');
                return res.status(200).json({ data: trips, count: Math.ceil(total / config_1.PAGINATION_PAGE) });
            }
        }
        return res.status(400).json({ message: config_1.UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetAllTrips = GetAllTrips;
