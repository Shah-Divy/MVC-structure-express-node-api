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

// Controller to get all User
const getAllSignup = async (req, res) => {
  try {
    const Users = await User.find(); // Fetch all User
    res.status(200).send(Users);
  } catch (err) {
    res.status(500).send('Error fetching User: ' + err.message);
  }
};

// Controller to get a User by ID
const getSignupById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id); // Find User by ID
    if (!user) return res.status(404).send('User not found');
    
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send('Error fetching User: ' + err.message);
  }
};

module.exports = { signup, getAllSignup, getSignupById };
