import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setUser: (state, action) => {
      const profile = action.payload
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.phone = profile.phone
      state.user.bio = profile.bio
      state.user.photo = profile.photo
    },
  },
})

export const { setLogin, setUser } = authSlice.actions

export default authSlice.reducer
