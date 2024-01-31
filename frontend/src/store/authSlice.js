import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  userId:null,
  Authed:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.value += 1
    },
    setAuth: (state) => {
      state.value -= 1
    },
    logout: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { login, setAuth, logout } = authSlice.actions

export default authSlice.reducer