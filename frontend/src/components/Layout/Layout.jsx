import React from 'react'
import { Box } from '@mui/system'
import { Outlet } from 'react-router-dom'
import Navbar from '../Header/Navbar'

function Layout() {
  return (
    <Box width='100%' height='100%'>
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    </Box>
  )
}

export default Layout