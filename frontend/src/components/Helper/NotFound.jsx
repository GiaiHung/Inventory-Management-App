import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="screen-center">
      <div className="flex flex-col space-y-4 text-2xl">
        <h1 className='text-3xl font-bold'>Oops, 404 - Page not found</h1>
        <button
          className="bg-blue-500 rounded-md cursor-pointer text-white font-semibold py-4"
          onClick={() => navigate('/')}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}

export default NotFound
