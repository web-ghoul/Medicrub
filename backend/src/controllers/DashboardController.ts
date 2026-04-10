import { Request, Response, NextFunction } from "express";
import { Admin, Driver, Trip } from "../model";
import { AdminPayload } from "../dto";
import { DEFAULT_ERROR_MSG, NOT_EXIST_ERROR_MSG } from "../config";
import { RemoveDateTime } from "../utility/DateUtility";

export const GetDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminPayload = req.user as AdminPayload;

    if (adminPayload) {
      const admin = await Admin.findById(adminPayload._id);
      if (admin) {
        // 1. Total Drivers
        const totalDrivers = await Driver.countDocuments({ verified: true });

        // 2. Pending Drivers
        const pendingDrivers = await Driver.countDocuments({ verified: false });

        // 3. Trips Today
        const todayStr = RemoveDateTime(new Date());
        const tripsToday = await Trip.find({ date: todayStr });
        const totalTripsToday = tripsToday.length;

        // 4. Income Today
        const incomeToday = tripsToday.reduce(
          (sum, trip) => sum + (trip.cost || 0),
          0,
        );

        // 5. Recent Trips (Last 5)
        const recentTrips = await Trip.find()
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

    return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: DEFAULT_ERROR_MSG });
  }
};
