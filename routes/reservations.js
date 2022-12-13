const router = require('express')
  .Router()
const Reservation = require('../model/Reservation')
const verify = require('../utility/verifyToken')
const { idValidation, reservationValidation } = require('../utility/validation')

// dobavi sve rezervacije
router.get('/', async(req, res) => {
  try {
    const reservations = await Reservation.find()
    res.json(reservations)
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// nadi odredenu rezervaciju
router.get('/:reservationId', async(req, res) => {
  // validate the id format
  const { error } = idValidation(req.params.reservationId)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }

  try {
    const reservation = await Reservation.findById(req.params.reservationId)
    if (!reservation) {
      res.status(404)
        .send({ message: 'Reservation not found' })
    } else {
      res.json(reservation)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// izbrisi odredenu rezervaciju
router.delete('/:reservationId', verify, async(req, res) => {
  const { err } = idValidation(req.params.reservationId)
  if (err) {
    return res.status(400)
      .send({ message: err.details[0].message })
  } else {
    try {
      const removedReservation = await Reservation.deleteOne({
        _id: req.params.reservationId
      })
      if (!removedReservation) {
        res.status(404)
          .send({ message: 'Reservation not found' })
      } else {
        res.json(removedReservation)
      }
    } catch (error) {
      res.status(500)
        .json({ message: error })
    }
  }
})

// stvori novu rezervaciju
router.post('/', verify, async(req, res) => {
  const { error } = reservationValidation(req.body)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  const reservation = new Reservation({
    x: req.body.x,
    y: req.body.y,
    fillColor: req.body.fillColor,
    from: req.body.from,
    to: req.body.to
  })

  try {
    const savedReservation = await reservation.save()
    res.send({ reservation: savedReservation })
  } catch (err) {
    res.status(500)
      .send(err)
  }
})

// edit rezervaciju
router.put('/:reservationId', verify, async(req, res) => {
  const { err } = idValidation(req.params.reservationId)
  if (err) {
    return res.status(400)
      .send({ message: err.details[0].message })
  }

  const { error } = reservationValidation(req.body)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  try {
    const updatedReservation = await Reservation.updateOne(
      { _id: req.params.reservationId },
      {
        $set: {
          x: req.body.x,
          y: req.body.y,
          fillColor: req.body.fillColor,
          from: req.body.from,
          to: req.body.to
        }
      }
    )
    if (!updatedReservation) {
      res.status(404)
        .send({ message: 'Reservation not found' })
    } else {
      res.json(updatedReservation)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

module.exports = router
