import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state) => {
        state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
