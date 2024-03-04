import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import driverCarReducer from "./driverCarSlice"
import driverReducer from "./driverSlice"
import driversReducer from "./driversSlice"
import nearestDriversReducer from "./nearestDriversSlice"
import pendingDriversReducer from "./pendingDriversSlice"
import tripsReducer from "./tripsSlice"

export const store = configureStore({
  reducer: {
    "auth":authReducer,
    "drivers":driversReducer,
    "driver":driverReducer,
    "driverCar":driverCarReducer,
    "pendingDrivers":pendingDriversReducer,
    "trips":tripsReducer,
    "nearestDrivers":nearestDriversReducer
  },
})