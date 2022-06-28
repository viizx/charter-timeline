const router = require('express')
  .Router()
const Reservation = require('../model/Reservation')
const verify = require('../utility/verifyToken')

// dobavi sve rezervacije
router.get('/', async(req, res) => {
  try {
    const reservations = await Reservation.find()
    res.json(reservations)
  } catch (error) {
    res.json({ message: error })
  }
})

// nadi odredenu rezervaciju
router.get('/:reservationId', async(req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId)
    res.json(reservation)
  } catch (error) {
    res.json({ message: error })
  }
})

// izbrisi odredenu rezervaciju
router.delete('/:reservationId', async(req, res) => {
  try {
    const removedReservation = await Reservation.deleteOne({
      _id: req.params.reservationId
    })
    res.json(removedReservation)
  } catch (error) {
    res.json({ message: error })
  }
})

// stvori novu rezervaciju
router.post('/', async(req, res) => {
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
    res.send(err)
    console.log(err, req.body)
  }
})

// edit rezervaciju
router.put('/:reservationId', async(req, res) => {
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
    res.json(updatedReservation)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
