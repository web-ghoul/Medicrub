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
exports.GetDashboardStats = void 0;
const model_1 = require("../model");
const config_1 = require("../config");
const DateUtility_1 = require("../utility/DateUtility");
const GetDashboardStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminPayload = req.user;
        if (adminPayload) {
            const admin = yield model_1.Admin.findById(adminPayload._id);
            if (admin) {
                // 1. Total Drivers
                const totalDrivers = yield model_1.Driver.countDocuments({ verified: true });
                // 2. Pending Drivers
                const pendingDrivers = yield model_1.Driver.countDocuments({ verified: false });
                // 3. Trips Today
                const todayStr = (0, DateUtility_1.RemoveDateTime)(new Date());
                const tripsToday = yield model_1.Trip.find({ date: todayStr });
                const totalTripsToday = tripsToday.length;
                // 4. Income Today
                const incomeToday = tripsToday.reduce((sum, trip) => sum + (trip.cost || 0), 0);
                // 5. Recent Trips (Last 5)
                const recentTrips = yield model_1.Trip.find()
                    .limit(5)
                    .sort("-createdAt")
                    .populate("pickup")
                    .populate("destination")
                    .populate({
                    path: "patient",
                    select: "firstName lastName phone",
                })
                    .populate({
                    path: "driver",
                    populate: {
                        path: "user",
                        select: "firstName lastName",
                    },
                });
                return res.status(200).json({
                    data: {
                        totalDrivers,
                        pendingDrivers,
                        totalTripsToday,
                        incomeToday,
                        recentTrips,
                    },
                });
            }
        }
        return res.status(400).json({ message: config_1.NOT_EXIST_ERROR_MSG });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: config_1.DEFAULT_ERROR_MSG });
    }
});
exports.GetDashboardStats = GetDashboardStats;
