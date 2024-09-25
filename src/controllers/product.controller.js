// src/controllers/product.controller.js
const Product = require('../models/product.model');
const bcrypt = require('bcryptjs');
const { productSchema } = require('../validations/product.validation');

const product = async (req, res) => {
  // Validate request data
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { modelname, companyname, price } = req.body;

  // Check if user already exists
   const existingProduct = await Product.findOne({ modelname });
   if (existingProduct) return res.status(400).send('ModelName is already exists');

  // Hash the password
  const hashedPrice = await bcrypt.hash(price, 10);

  // Create and save new user
  const newProduct = new Product({
    modelname,
    companyname,
    price : hashedPrice
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).send({
      id: savedProduct._id,
      modelname: savedProduct.modelname,
      companyname: savedProduct.companyname
    });
  } catch (err) {
    res.status(500).send('Error saving user: ' + err.message);
  }
};

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
};

// Controller to get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id); // Find product by ID
    if (!product) return res.status(404).send('Product not found');
    
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send('Error fetching product: ' + err.message);
  }
};


module.exports = { product, getAllProducts, getProductById  };
