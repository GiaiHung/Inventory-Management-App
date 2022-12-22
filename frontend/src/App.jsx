import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import Login from './pages/auth/Login'
import Home from './pages/home'
import NotFound from './components/Helper/NotFound'
import PrivateRoutes from './components/Helper/PrivateRoutes'
import Register from './pages/auth/Register'
import Layout from './components/Layout/Layout'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'
import ChangePassword from './pages/auth/ChangePassword'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPasword'
import Products from './pages/products'
import Customers from './pages/customers'
import Transactions from './pages/transactions'
import Geography from './pages/geography'
import Overview from './pages/overview'
import Daily from './pages/daily'
import Monthly from './pages/monthly'
import Breakdown from './pages/breakdown'
import Admin from './pages/admin'
import Performance from './pages/performance'

function App() {
  const mode = useSelector((state) => state.theme.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
