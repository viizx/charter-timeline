const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 255
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 255
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 5
    },
    isAdmin: {
      type: Boolean
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
