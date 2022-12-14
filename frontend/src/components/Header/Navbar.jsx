import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
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
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../store/themeSlice'
import { Link } from 'react-router-dom'
import { setLogout } from '../../store/authSlice'

function Navbar() {
  const theme = useTheme()
  const user = useSelector((state) => state.auth.user)
  const backgroundTheme = theme.palette.background.alt

  // Menu
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar alt={user.name} src={user.photo} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              sx={{ fontSize: '16px', borderBottom: '1px gray solid' }}
              onClick={handleClose}
            >
              <Link to="/profile" className="flex items-center gap-x-1">
                <span>
                  <AiOutlineUser className="icon mr-3" />
                </span>
                Profile
              </Link>
            </MenuItem>
            <MenuItem sx={{ fontSize: '16px' }} onClick={handleClose}>
              <div onClick={() => dispatch(setLogout())} className="flex items-center gap-x-1">
                <span>
                  <AiOutlineLogout className="icon mr-3" />
                </span>
                Logout
              </div>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
