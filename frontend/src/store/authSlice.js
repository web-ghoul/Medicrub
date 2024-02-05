import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { handleAlert } from '../functions/handleAlert';

const initialState = {
  token: null,
  authed:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,{payload}) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      Cookies.set(`${process.env.REACT_APP_TOKEN_NAME}`,payload.token,{ expires: expirationDate })
      state.token = payload.token
      state.authed = true
    },
    setAuth: (state,{payload}) => {
      state.token = payload.token
      state.authed = true
    },
    logout: (state, action) => {
      state.token = null
      state.authed = false
      Cookies.remove(`${process.env.REACT_APP_TOKEN_NAME}`)
      handleAlert({msg:"Logout Successfully",status:"success"})
    },
  },
})

export const { login, setAuth, logout } = authSlice.actions

export default authSlice.reducer