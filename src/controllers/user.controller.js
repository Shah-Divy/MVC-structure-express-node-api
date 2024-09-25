// src/controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const signup = async (req, res) => {
  // Validate request data
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) return res.status(400).send('Username or email already exists');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).send({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email
    });
  } catch (err) {
    res.status(500).send('Error saving user: ' + err.message);
  }
};

module.exports = { signup };
