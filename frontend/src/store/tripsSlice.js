import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getTrips = createAsyncThunk(
  'trips/getTrips',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/Trips/${args.page}?date=${"2024-02-07"}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.data
  },
)

const initialState = {
  trips: null,
  isLoading:true
}

export const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getTrips.fulfilled, (state, { payload }) => {
      state.trips = payload
      state.isLoading = false
    })
    builder.addCase(getTrips.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export default tripsSlice.reducer