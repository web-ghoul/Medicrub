import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getNearestDrivers = createAsyncThunk(
  'nearestDrivers/getNearestDrivers',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/NearestDrivers?latitude=${args.lat}&longitude=${args.lng}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.data
  },
)

const initialState = {
  nearestDrivers: null,
  allNearestDrivers:null,
  isLoading:true
}

export const nearestDriversSlice = createSlice({
  name: 'nearestDrivers',
  initialState,
  reducers: {
    searchForNearestDriver:(state,{payload})=>{
      state.isLoading = true
      state.nearestDrivers = state.allNearestDrivers.filter((e)=> `${e.driver.user.firstName} ${e.driver.user.lastName}`.toLowerCase().includes(payload.search.toLowerCase()))
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNearestDrivers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getNearestDrivers.fulfilled, (state, { payload }) => {
      state.nearestDrivers = payload
      state.allNearestDrivers = payload
      state.isLoading = false
    })
    builder.addCase(getNearestDrivers.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export const {searchForNearestDriver} = nearestDriversSlice.actions
export default nearestDriversSlice.reducer