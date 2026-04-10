import { Authenticate } from "../middlewares/CommontAuth";

import express from "express";

import {
  GetAllDrivers,
  GetAllTrips,
  GetPendingDrivers,
  CreateAdmin,
  AdminLogin,
  AdminCreateDriver,
  AdminAddDriverLicense,
  AdminCreateCar,
  AdminCreateCarAlbum,
  AdminGetDriver,
  AdminDriverCarDetails,
  AdminUpdateDriver,
  VerifyDriver,
  GetNearestDriver,
  CreateTrip,
  UpdateTrip,
  CreateMultiTrip,
  GetDashboardStats,
} from "../controllers";

const router = express.Router();

router.post("/Login", AdminLogin);

router.use(Authenticate);

router.get("/Drivers/:page", GetAllDrivers);

router.get("/DashboardStats", GetDashboardStats);
router.get("/Trips/:page", GetAllTrips);

router.get("/PendingDrivers/:page", GetPendingDrivers);

router.get("/NearestDrivers", GetNearestDriver);

router.post("/CreateAdmin", CreateAdmin);

router.post("/CreateDriver", AdminCreateDriver);

router.post("/AddDriverLicense", AdminAddDriverLicense);

router.put("/UpdateDriver", AdminUpdateDriver);

router.put("/VerifyDriver", VerifyDriver);

router.post("/CreateCar", AdminCreateCar);

router.post("/CreateCarAlbum", AdminCreateCarAlbum);

router.post("/CreateTrip", CreateTrip);

router.put("/UpdateTrip", UpdateTrip);

router.post("/CreateMultiTrip", CreateMultiTrip);

router.get("/DriverDetails", AdminGetDriver);

router.get("/DriverCarDetails", AdminDriverCarDetails);

export { router as AdminRoute };
