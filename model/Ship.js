const mongoose = require('mongoose')

const shipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  crew: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Ship', shipSchema)
