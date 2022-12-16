import React, { useState, useEffect } from 'react'
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdOutlineSettings } from 'react-icons/md'
import { navItems } from '../../utils/constants'

function Sidebar({ width, isSidebarOpen, isNonMobile, setIsSidebarOpen }) {
  const { pathname } = useLocation()
  const [sidebarItemActive, setSidebarItemActive] = useState('dashboard')
  const theme = useTheme()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    setSidebarItemActive(pathname.substring(1))
  }, [pathname])

  return (
    <Box component="nav" className="scrollbar-hidden">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: 0,
              width,
            },
          }}
        >
          <Box width="100%">
            <Box m="2rem">
              <div
                className={`text-${theme.palette.secondary.main} flex items-center justify-between`}
              >
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Inventory App
                  </Typography>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <FaChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </div>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: '2.25rem 0 1rem 3rem', fontSize: '16px', fontWeight: 'bold' }}
                    >
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`)
                        setSidebarItemActive(lcText)
                      }}
                      sx={{
                        backgroundColor:
                          sidebarItemActive === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          sidebarItemActive === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '1rem',
                          color:
                            sidebarItemActive === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {sidebarItemActive === lcText && <FaChevronRight sx={{ ml: 'auto' }} />}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>

          <Divider />
          <div className="flex-between py-4">
            <Box
              component="img"
              alt="profile"
              src={user.photo}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: 'cover' }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                {user.occupation}
              </Typography>
            </Box>
            <MdOutlineSettings className="icon text-2xl hover:text-white" />
          </div>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
