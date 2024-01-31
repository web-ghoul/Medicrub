import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

export const getDrivers = createAsyncThunk(
  'drivers/getDrivers',
  async (args) => {
    const token = ""
    const res = await axios.get(`http://localhost:3000/api/Admin/Drivers/${args.page}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    return res.data.data
  },
)

const initialState = {
  drivers: null,
  isLoading:true
}

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDrivers.fulfilled, (state, { payload }) => {
      state.drivers = payload
      state.isLoading = false
    })
    builder.addCase(getDrivers.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export default driversSlice.reducer