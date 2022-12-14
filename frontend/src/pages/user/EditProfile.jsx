import React from 'react'
import { useSelector } from 'react-redux'
import { HiMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

function EditProfile() {
  const user = useSelector((state) => state.auth.user)
  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  }
  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { value, name } = e.target
    console.log(value, name)
    setProfile({ ...profile, [name]: value })
  }

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageURL
      if (
        profileImage &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData()
        image.append('file', profileImage)
        image.append('cloud_name', 'dgj7h6a5k')
        image.append('upload_preset', 'inventory_app')

        // First save to cloudinary database
        const response = await fetch('https://api.cloudinary.com/v1_1/dgj7h6a5k/image/upload', {
          method: 'post',
          body: image,
        })
        const imgData = await response.json()
        imageURL = imgData.url.toString()
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      }

      console.log(imageURL)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className="mx-auto mt-4 flex max-w-xl flex-col items-center justify-center px-4 md:px-0">
      <img
        src={profile.photo}
        alt=""
        className="mx-auto h-[200px] w-[200px] rounded-full object-cover md:h-[300px] md:w-[300px]"
      />
      <form className="mt-4 space-y-4" onSubmit={saveProfile}>
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <AiOutlineUser />
            <span className="font-semibold">Name: </span>
          </div>
          <input
            className="rounded-md px-3 py-1 text-black outline-none"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <HiMail />
            <span className="font-semibold">Email: </span>
          </div>
          <input
            className="rounded-md px-3 py-1 text-black outline-none"
            type="text"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center gap-x-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <BsTelephoneFill />
            <span className="font-semibold">Phone: </span>
          </div>
          <input
            className="rounded-md px-3 py-1 text-black outline-none"
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4 text-lg">
          <div className="flex items-center gap-x-2 text-gray-500">
            <MdLocationPin />
            <span className="font-semibold">Biography: </span>
          </div>
          <textarea
            name="bio"
            value={profile?.bio}
            onChange={handleInputChange}
            cols="35"
            rows="7"
            className="rounded-md p-3 text-black"
          ></textarea>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-500">Select your image: </p>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="flex w-full justify-center">
          <button type='submit' className="rounded-lg bg-blue-500 px-3 py-1 text-lg font-semibold hover:bg-blue-600" onClick={saveProfile}>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
