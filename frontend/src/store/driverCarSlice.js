import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getDriverCar = createAsyncThunk(
  'driverCar/getDriverCar',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/DriverCarDetails?id=${args.id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.data
  },
)

const initialState = {
  driverCar: null,
  isLoading:true
}

export const driverCarSlice = createSlice({
  name: 'driverCar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDriverCar.fulfilled, (state, { payload }) => {
      state.driverCar = payload
      state.isLoading = false
    })
    builder.addCase(getDriverCar.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export default driverCarSlice.reducer