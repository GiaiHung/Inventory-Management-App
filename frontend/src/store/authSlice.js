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

const authSlice = createSlice({
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
    setLogout: (state) => {
      state.isLoggedIn = false
      state.user.name = ''
      state.user.email = ''
      state.user.phone = ''
      state.user.bio = ''
      state.user.photo = ''
    },
  },
})

const { setLogin, setUser, setLogout } = authSlice.actions

export {authSlice, setLogin, setUser, setLogout}

export default authSlice.reducer
