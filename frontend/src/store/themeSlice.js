import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state) => {
        state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  },
})

const { setTheme } = themeSlice.actions

export {themeSlice, setTheme}
export default themeSlice.reducer
