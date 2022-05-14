const router = require("express").Router();
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// validation
const joi = require("@hapi/joi");

const schema = joi.object({
  email: joi.string().min(6).required().email(),
  password: joi.string().min(6).required(),
});

//login
router.post("/login", async (req, res) => {
  //validate the data before logging in
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });
  //check that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "email doesn't exist" });
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ message: "wrong password" });

  //create and assign token
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token, user });
});

module.exports = router;
