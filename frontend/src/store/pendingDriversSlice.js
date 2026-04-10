import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';
import { getApiUrl } from '../functions/getApiUrl';

export const getPendingDrivers = createAsyncThunk(
  'pendingDrivers/getPendingDrivers',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(getApiUrl(`/PendingDrivers/${args.page}`), {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return {data:res.data.data, count:res.data.count}
  },
)

const initialState = {
  pendingDrivers: null,
  count: 0,
  isLoading:true
}

export const pendingDriversSlice = createSlice({
  name: 'pendingDrivers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPendingDrivers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPendingDrivers.fulfilled, (state, { payload }) => {
      state.pendingDrivers = payload.data
      state.count = payload.count
      state.isLoading = false
    })
    builder.addCase(getPendingDrivers.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        console.log(action.payload.errorMessage)
      } else {
        console.log(action.error)
      }
    })
  },
})


export default pendingDriversSlice.reducer