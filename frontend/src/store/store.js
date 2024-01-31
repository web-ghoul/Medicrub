import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import driversReducer from "./driversSlice"

export const store = configureStore({
  reducer: {
    "auth":authReducer,
    "drivers":driversReducer
  },
})