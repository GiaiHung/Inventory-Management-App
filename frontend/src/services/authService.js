import { toast } from 'react-hot-toast'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/user/login`, data)
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

export { loginUser }
