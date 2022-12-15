import React, { useState } from 'react'
import { Box } from '@mui/system'
import { useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../Header/Navbar'
import Sidebar from '../Sidebar/Sidebar'

function Layout() {
  const isNonMobile = useMediaQuery('(min-width: 600px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        width="250px"
        isSidebarOpen={isSidebarOpen}
        isNonMobile={isNonMobile}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
