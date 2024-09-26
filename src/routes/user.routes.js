// src/routes/user.routes.js
const express = require('express');
const { signup, getAllSignup, getSignupById } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', signup);
router.get('/user/all-data', getAllSignup); // Get all User
router.get('/user/:id', getSignupById); // Get User by ID

module.exports = router;
