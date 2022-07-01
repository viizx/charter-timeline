const joi = require('joi')

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string()
      .min(2)
      .required(),
    email: joi.string()
      .min(6)
      .required()
      .email(),
    password: joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string()
      .min(6)
      .required()
      .email(),
    password: joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data)
}

const shipValidation = (data) => {
  const schema = joi.object({
    name: joi.string()
      .min(3)
      .required(),
    length: joi.number()
      .min(2)
      .required(),
    width: joi.number()
      .min(2)
      .required(),
    capacity: joi.number()
      .min(2)
      .required(),
    crew: joi.number()
      .min(2)
      .required()
  })

  return schema.validate(data)
}

const reservationValidation = (data) => {
  const schema = joi.object({
    x: joi.string()
      .min(3)
      .required(),
    y: joi.array()
      .length(2)
      .required(),
    from: joi.string()
      .min(3)
      .required(),
    to: joi.string()
      .min(3)
      .required()
  })

  return schema.validate(data)
}

const idValidation = (data) => {
  const schema = joi.string()
    .length(24)
    .required()

  return schema.validate(data)
}

const emailValidation = (data) => {
  const schema = joi.string()
    .email()
    .min(6)
    .required()

  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.shipValidation = shipValidation
module.exports.reservationValidation = reservationValidation
module.exports.idValidation = idValidation
module.exports.emailValidation = emailValidation
