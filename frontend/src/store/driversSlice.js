import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';
import { getApiUrl } from '../functions/getApiUrl';

export const getDrivers = createAsyncThunk(
  'drivers/getDrivers',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(getApiUrl(`/Drivers/${args.page}`), {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return {data:res.data.data, count:res.data.count}
  },
)

const initialState = {
  drivers: null,
  count: 0,
  isLoading:true
}

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    updateDriver:(state,{payload})=>{
      state.isLoading = true
      if(payload && payload._id){
        let drivers = state.drivers.map((driver)=>{
          if(driver._id === payload._id){
            return payload
          }
          return driver
        })
        state.drivers = drivers
      }
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDrivers.fulfilled, (state, { payload }) => {
      state.count = payload.count
      state.drivers = payload.data
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