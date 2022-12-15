import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from '../../components/Helper/Loading'
import { loginUser, validateEmail } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setUser } from '../../store/authSlice'

function Login() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    if (!validateEmail(data.email)) {
      return toast.error('Please enter a valid email')
    }
    setLoading(true)
    try {
      const user = await loginUser(data)
      if (user) {
        dispatch(setLogin(true))
        dispatch(setUser(user))
        navigate('/')
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  if (useSelector((state) => state.auth.isLoggedIn)) {
    return <Navigate to="/" />
  }

  return (
    <div className="screen-center">
      <div className="mx-auto min-h-[40vh] w-[90vw] rounded-lg bg-white py-8 px-4 text-black md:w-[27vw]">
        <h1 className="mb-4 text-center text-3xl font-semibold">Welcome back!</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Your email"
              className="loginInput"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="mt-2 text-sm font-semibold text-red-500">Email is required!</div>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              autoComplete=""
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="mt-2 text-sm font-semibold text-red-500">Password is required!</div>
            )}
          </label>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-violet-500 py-3 text-2xl font-semibold text-white transition duration-150 ease-in hover:bg-violet-600"
          >
            {loading && <Loading />}
            Login
          </button>
          <Link to="/forgotPassword">
            <button className="text-violet-500 hover:underline">Forgot password</button>
          </Link>
          <div className="flex gap-x-1 text-sm">
            <p>Don't have an account?</p>
            <Link to="/register">
              <span className="cursor-pointer text-blue-500 hover:underline">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
