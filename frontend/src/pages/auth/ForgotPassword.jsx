import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineMail } from 'react-icons/ai'
import Loading from '../../components/Helper/Loading'
import { forgotPassword, validateEmail } from '../../services/authService'

function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const { email } = data
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }
    try {
        setLoading(true)
        await forgotPassword(data)
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
          <AiOutlineMail className="text-red-500 text-4xl" />
          <span className='text-red-500'>Change password</span>
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Enter your registered email"
              className="loginInput"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="mt-2 text-sm font-semibold text-red-500">Email is required!</div>
            )}
          </label>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-violet-500 py-3 text-2xl font-semibold text-white transition duration-150 ease-in hover:bg-violet-600"
          >
            {loading && <Loading />}
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
