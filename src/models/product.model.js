// src/models/product.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  modelname: 
  { 
    type: String, 
    required: true
   },

  companyname: 
  { 
    type: String, 
    required: true 
  },

  price: 
  { 
    type: String, 
    required: true 
  }
  
});

module.exports = mongoose.model('Product', productSchema);