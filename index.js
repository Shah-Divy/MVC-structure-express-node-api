// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/product.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/express-signup-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Use user routes
app.use('/api', userRoutes , productRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
