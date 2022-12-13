const router = require('express')
  .Router()
const User = require('../model/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verify = require('../utility/verifyToken')
const {
  registerValidation,
  loginValidation,
  emailValidation,
  idValidation
} = require('../utility/validation')

// dobavi korisnika mailom
router.get('/email/', verify, async(req, res) => {
  const { error } = emailValidation(req.body.email)
  if (error) {
    res.status(400)
      .send({ message: error.details[0].message })
  } else {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        res.status(404)
          .send({ message: 'User not found' })
      } else {
        res.json(user)
      }
    } catch (error) {
      res.status(500)
        .json({ message: error })
    }
  }
})
// dobavi korisnike
router.get('/', verify, async(req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// dobavi korisnika
router.get('/:userId', verify, async(req, res) => {
  // validate the id format
  const { error } = idValidation(req.params.userId)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  try {
    const user = await User.findOne({ _id: req.params.userId })
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// izbrisi korisnika pomocu id-a
router.delete('/:userId', verify, async(req, res) => {
  // validate the id format
  const { error } = idValidation(req.params.userId)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  try {
    const user = await User.deleteOne({ _id: req.params.userId })
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500)
      .json({ message: error })
  }
})

// login
router.post('/login', async(req, res) => {
  // validate the data before logging in
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(400)
      .send({ message: error.details[0].message })
  }
  // check that email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404)
      .send({ message: 'User not found' })
  }
  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) {
    return res.status(400)
      .send({ message: 'Wrong password' })
  }
  // create and assign token
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  if (!token) {
    res.send(500)
      .send({ message: 'Internal Server Error' })
  } else {
    res.header('auth-token', token)
      .json({ token, user })
  }
})

// registriraj korisnika
router.post('/register', async(req, res) => {
  // validate the data before creating the user
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400)
      .send(error.details[0].message)
  }
  // check duplicate
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    return res.status(400)
      .send('email aldeady exists')
  }
  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    isVerified: true,
    isAdmin: true
  })
  try {
    const savedUser = await user.save()
    res.send({ user: savedUser._id })
  } catch (error) {
    res.status(500)
      .send(error)
  }
})

module.exports = router
