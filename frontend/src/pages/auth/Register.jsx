import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="screen-center">
      <div className="mx-auto min-h-[40vh] w-[90vw] rounded-lg bg-white py-8 px-4 text-black md:w-[27vw]">
        <h1 className="mb-4 text-center text-3xl font-semibold">Become our member!</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="inline-block w-full">
            <input type="text" placeholder="Your email" className="loginInput" />
            {/* {...register('email', { required: true })} */}
            {/* {errors.email && (
              <div className="mt-2 text-sm font-semibold text-red-500">Email is required!</div>
            )} */}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              // {...register('password', { required: true })}
            />
            {/* {errors.password && (
              <div className="mt-2 text-sm font-semibold text-red-500">Password is required!</div>
            )} */}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Repeat password"
              className="loginInput"
              // {...register('password', { required: true })}
            />
            {/* {errors.password && (
              <div className="mt-2 text-sm font-semibold text-red-500">Password is required!</div>
            )} */}
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-500 py-3 text-2xl font-semibold text-white"
          >
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
