// src/validations/user.validation.js
const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = { signupSchema };
