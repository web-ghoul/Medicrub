import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import driverCarReducer from "./driverCarSlice"
import driverReducer from "./driverSlice"
import driversReducer from "./driversSlice"

export const store = configureStore({
  reducer: {
    "auth":authReducer,
    "drivers":driversReducer,
    "driver":driverReducer,
    "driverCar":driverCarReducer
  },
})