import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getDriver = createAsyncThunk(
  'driver/getDriver',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/DriverDetails?id=${args.id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.data
  },
)

const initialState = {
  driver: null,
  isLoading:true
}

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDriver.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(getDriver.fulfilled, (state, { payload }) => {
      state.driver = payload
      state.isLoading = false
    })
    builder.addCase(getDriver.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export default driverSlice.reducer