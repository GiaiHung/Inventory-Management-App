import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from '../../components/Helper/Loading'
import { updatePassword } from '../../services/authService'
import { setLogout } from '../../store/authSlice'

function ChangePassword() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const { newPassword, repeatPassword } = data
    if (newPassword !== repeatPassword) {
      return toast.error('New and repeat password must be the same!')
    }
    if(newPassword.length < 6) {
      return toast.error('New password must be at least 6 characters')
    }
    try {
      setLoading(true)
      await updatePassword(data)
      dispatch(setLogout())
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="screen-center">
      <div className="mx-auto min-h-[40vh] w-[90vw] rounded-lg bg-white py-8 px-4 text-black md:w-[27vw]">
        <h1 className="mb-4 text-center text-3xl font-semibold">Change password</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Old password"
              className="loginInput"
              autoComplete=""
              {...register('oldPassword', { required: true })}
            />
            {errors.oldPassword && (
              <div className="mt-2 text-sm font-semibold text-red-500">
                Old password is required!
              </div>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="New password"
              className="loginInput"
              autoComplete=""
              {...register('newPassword', { required: true })}
            />
            {errors.newPassword && (
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
            Change password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
