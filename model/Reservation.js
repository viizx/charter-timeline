const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  x: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  fillColor: {
    type: String,
    required: true,
    max: 1024,
    min: 5,
  },
  y: {
    type: Array,
    required: true,
    max: 2,
    min: 2,
  },
  from: {
    type: String,
    required: true,
    max: 1024,
    min: 3,
  },
  to: {
    type: String,
    required: true,
    max: 1024,
    min: 3,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
