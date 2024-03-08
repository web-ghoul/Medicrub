import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getDrivers = createAsyncThunk(
  'drivers/getDrivers',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/Drivers/${args.page}`,{
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
    updateDriver:(state,{payload})=>{
      console.log(state.drivers,payload);
      state.isLoading = true
      if(payload && payload._id){
        let drivers = state.drivers
        drivers.map((driver)=>{
          if(driver._id === payload._id){
            return payload
          }
          return driver
        })
        state.drivers = drivers
      }
      state.isLoading = false
      console.log(state.drivers);
    }
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

export const {updateDriver} = driversSlice.actions
export default driversSlice.reducer