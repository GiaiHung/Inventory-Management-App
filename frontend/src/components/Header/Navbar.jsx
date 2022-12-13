import React from 'react'
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material'
import { FaBars, FaSearch } from 'react-icons/fa'
import { MdOutlineLightMode, MdOutlineDarkMode, MdSettings } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setTheme } from '../../store/themeSlice'

function Navbar() {
  const theme = useTheme()
  const backgroundTheme = theme.palette.background.alt

  const dispatch = useDispatch()

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left */}
        <div className="flex-between">
          <FaBars className="icon" onClick={() => console.log('Open/Close sidebar')} />
          <div
            className={`flex-between rounded-lg border border-gray-500 bg-[${backgroundTheme}] px-4 py-1`}
          >
            <InputBase placeholder="Search..." />
            <FaSearch className="icon" />
          </div>
        </div>
        {/* Right */}
        <div className="flex-between">
          {theme.palette.mode === 'dark' ? (
            <IconButton onClick={() => dispatch(setTheme())}>
              <MdOutlineDarkMode className="icon" />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(setTheme())}>
              <MdOutlineLightMode className="icon" />
            </IconButton>
          )}
          <IconButton>
            <MdSettings className="icon" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
