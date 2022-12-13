import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loading from '../../components/Helper/Loading'
import { registerUser, validateEmail } from '../../services/authService'

function Register() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const { email, password, repeatPassword } = data
    if (password !== repeatPassword) {
      return toast.error('Please make sure the password matches')
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }

    setLoading(true)
    try {
      const user = await registerUser(data)
      console.log(user)
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="screen-center">
      <div className="mx-auto min-h-[40vh] w-[90vw] rounded-lg bg-white py-8 px-4 text-black md:w-[27vw]">
        <h1 className="mb-4 text-center text-3xl font-semibold">Become our member!</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Your name"
              className="loginInput"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <div className="mt-2 text-sm font-semibold text-red-500">Name is required!</div>
            )}
          </label>
          {/* Email */}
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
          {/* Password */}
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
          {/* Repeat password */}
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Repeat password"
              className="loginInput"
              autoComplete=""
              {...register('repeatPassword', { required: true })}
            />
            {errors.repeatPassword && (
              <div className="mt-2 text-sm font-semibold text-red-500">
                Repeat password is required!
              </div>
            )}
          </label>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-violet-500 py-3 text-2xl font-semibold text-white transition duration-150 ease-in hover:bg-violet-600"
          >
            {loading && <Loading />}
            Register
          </button>
          <div className="flex gap-x-1 text-sm">
            <p>Already have an account?</p>
            <Link to="/login">
              <span className="cursor-pointer text-blue-500 hover:underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
