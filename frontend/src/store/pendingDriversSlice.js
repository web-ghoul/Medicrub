import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'js-cookie';

export const getPendingDrivers = createAsyncThunk(
  'pendingDrivers/getPendingDrivers',
  async (args) => {
    const token = Cookies.get(`${process.env.REACT_APP_TOKEN_NAME}`)
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/PendingDrivers/${args.page}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.data
  },
)

const initialState = {
  pendingDrivers: null,
  isLoading:true
}

export const pendingDriversSlice = createSlice({
  name: 'pendingDrivers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPendingDrivers.fulfilled, (state, { payload }) => {
      state.pendingDrivers = payload
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