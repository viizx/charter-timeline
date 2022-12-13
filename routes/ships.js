const router = require('express')
  .Router()
const Ship = require('../model/Ship')
const verify = require('../utility/verifyToken')
const { shipValidation, idValidation } = require('../utility/validation')

// dobavi sve brodove
router.get('/', async(req, res) => {
  try {
    const ships = await Ship.find()
    res.json(ships)
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// nadi odredeni brod
router.get('/:shipId', async(req, res) => {
  // validate the id format
  const { error } = idValidation(req.params.shipId)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  try {
    const ship = await Ship.findById(req.params.shipId)
    if (!ship) {
      res.status(404)
        .send({ message: 'Ship not found' })
    } else {
      res.json(ship)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// izbrisi odredeni brod
router.delete('/:shipId', verify, async(req, res) => {
  // validate the id format
  const { error } = idValidation(req.params.shipId)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  try {
    const removedShip = await Ship.deleteOne({
      _id: req.params.shipId
    })
    if (!removedShip) {
      res.status(404)
        .send({ message: 'Ship not found' })
    } else {
      res.json(removedShip)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// dodaj novi brod
router.post('/', verify, async(req, res) => {

  // validate the data
  const { error } = shipValidation(req.body)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  const ship = new Ship({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    capacity: req.body.capacity,
    crew: req.body.crew
  })

  try {
    const savedShip = await ship.save()
    res.send({ ship: savedShip })
  } catch (err) {
    res.status(500)
      .send(err)
  }
})

// edit brod
router.put('/:shipId', verify, async(req, res) => {
  // validate the id format
  const { err } = idValidation(req.params.shipId)
  if (err) {
    return res.status(400)
      .send({ message: err.details[0].message })
  }

  // validate the data
  const { error } = shipValidation(req.body)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }

  try {
    const updatedShip = await Ship.updateOne(
      { _id: req.params.shipId },
      {
        $set: {
          name: req.body.name,
          length: req.body.length,
          width: req.body.width,
          capacity: req.body.capacity,
          crew: req.body.crew
        }
      }
    )
    if (!updatedShip) {
      res.status(404)
        .send({ message: 'Ship not found' })
    } else {
      res.json(updatedShip)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

module.exports = router
