import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: 'user',
  initialState: {
    userName: localStorage.getItem("userName"),
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload
      localStorage.setItem("userName", action.payload)
    },
  },
})

export const { setUserName } = systemSlice.actions

export default systemSlice.reducer
