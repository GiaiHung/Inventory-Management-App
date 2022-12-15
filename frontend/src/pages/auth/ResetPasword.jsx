import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MdPassword } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Helper/Loading'
import { resetPassword } from '../../services/authService'

function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate('/login')
  const {resetToken} = useParams()

  const onSubmit = async (data) => {
    const { password, repeatPassword } = data
    if (password !== repeatPassword) {
      return toast.error('New and repeat password must be the same!')
    }
    if (password.length < 6) {
      return toast.error('New password must be at least 6 characters')
    }
    try {
      setLoading(true)
      await resetPassword(data, resetToken)
      navigate('/login')
      setLoading(false)
    } catch (error) {
      return toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="screen-center">
      <div className="mx-auto min-h-[40vh] w-[90vw] rounded-lg bg-white py-8 px-4 text-black md:w-[27vw]">
        <h1 className="mb-4 flex items-center justify-center gap-x-3 text-center text-3xl font-semibold">
          <MdPassword className="text-4xl text-red-500" />
          <span className="text-red-500">Reset password</span>
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="New password"
              className="loginInput"
              autoComplete=""
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="mt-2 text-sm font-semibold text-red-500">
                New password is required!
              </div>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Repeat new password"
              className="loginInput"
              autoComplete=""
              {...register('repeatPassword', { required: true })}
            />
            {errors.repeatPassword && (
              <div className="mt-2 text-sm font-semibold text-red-500">
                Repeat new password is required!
              </div>
            )}
          </label>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-violet-500 py-3 text-2xl font-semibold text-white transition duration-150 ease-in hover:bg-violet-600"
          >
            {loading && <Loading />}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
