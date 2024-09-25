// src/routes/product.routes.js
const express = require('express');
const { product, getAllProducts, getProductById } = require('../controllers/product.controller');

const router = express.Router();

router.post('/product', product);
router.get('/products/all-data', getAllProducts); // Get all products
router.get('/product/:id', getProductById); // Get product by ID

module.exports = router;

