const mongoose = require('mongoose')

const shipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Ship', shipSchema)
