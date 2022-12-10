const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minLength: [6, 'Password must be at least 6 characters'],
    },
    photo: {
      type: String,
      required: [true, 'Please enter your photo'],
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone number'],
      default: '1111 222 3333',
    },
    bio: {
      type: String,
      maxLength: [250, 'Bio must not be more than 250 characters'],
      default: 'bio',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', UserSchema)
