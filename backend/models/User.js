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
      default: '111122233',
    },
    bio: {
      type: String,
      maxLength: [250, 'Bio must not be more than 250 characters'],
      default: 'bio',
    },
    city: {
      type: String,
      default: 'Ho Chi Minh City',
    },
    state: {
      type: String,
      default: 'South',
    },
    country: {
      type: String,
      default: 'VN',
    },
    occupation: {
      type: String,
      default: 'Office Worker',
    },
    transactions: {
      type: Array,
      default: ['63701d74f0323986f3000158', '63701d74f03239d40b00007e'],
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

// Hashed password middleware
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    // Bcrypt
    const bcrypt = require('bcryptjs')
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(this.password, salt)
    this.password = hashedPassword
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)
