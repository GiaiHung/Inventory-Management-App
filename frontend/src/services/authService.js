import { toast } from 'react-hot-toast'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

const registerUser = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/user/register`, data, {
      withCredentials: true,
    })
    if (res.statusText === 'OK') {
      toast.success('User registered successfully')
    }
    return res.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/user/login`, data, {
      withCredentials: true,
    })
    if (res.statusText === 'OK') {
      toast.success('Login successfully')
    }
    return res.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

const updateUser = async (data) => {
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/user/updateProfile`, data, {
      withCredentials: true,
    })
    if (res.statusText === 'OK') {
      toast.success('User has been updated successfully')
    }
    return res.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

const updatePassword = async (data) => {
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/user/updatePassword`, data, {
      withCredentials: true,
    })
    if (res.statusText === 'OK') {
      toast.success('Password has been updated successfully')
    }
    return res.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

const forgotPassword = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/user/forgotPassword`, data)
    if (res.statusText === 'OK') {
      toast.success('Reset email sent successfully')
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

const resetPassword = async (data, resetToken) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/api/user/resetPassword/${resetToken}`, data)
    if(res.statusText === 'OK') {
      toast.success('Password reset, you can now login again with your new password')
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    toast.error(message)
  }
}

export {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  validateEmail,
}
