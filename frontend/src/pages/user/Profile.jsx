import React from 'react'
import { useSelector } from 'react-redux'
import { HiMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Profile() {
  const { name, email, photo, phone, bio } = useSelector((state) => state.auth.user)
  const mode = useSelector((state) => state.theme.mode)
  return (
    <div className="mx-auto mt-4 flex max-w-xl flex-col items-center justify-center px-4 md:px-0">
      <img
        src={photo}
        alt=""
        className="mx-auto h-[200px] w-[200px] rounded-full object-cover md:h-[300px] md:w-[300px]"
      />
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <AiOutlineUser />
            <span className="font-semibold">Name: </span>
          </div>
          <div className={mode === 'dark' ? 'text-white' : 'text-black'}>{name}</div>
        </div>
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <HiMail />
            <span className="font-semibold">Email: </span>
          </div>
          <div className={mode === 'dark' ? 'text-white' : 'text-black'}>{email}</div>
        </div>
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <BsTelephoneFill />
            <span className="font-semibold">Phone: </span>
          </div>
          <div className={mode === 'dark' ? 'text-white' : 'text-black'}>{phone}</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <MdLocationPin />
            <span className="font-semibold">Biography: </span>
          </div>
          <div className={mode === 'dark' ? 'text-white' : 'text-black'}>{bio}</div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link to="/editProfile" className="flex justify-center">
            <button className="rounded-lg bg-blue-500 px-3 py-1 text-lg font-semibold hover:bg-blue-600">
              Edit profile
            </button>
          </Link>
          <Link to="/changePassword" className="flex justify-center">
            <button className="rounded-lg bg-blue-500 px-3 py-1 text-lg font-semibold hover:bg-blue-600">
              Change password
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
