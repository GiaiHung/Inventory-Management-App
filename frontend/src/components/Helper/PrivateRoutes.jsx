import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn)

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
