// src/validations/product.validation.js
const Joi = require('joi');

const productSchema = Joi.object({
    modelname: Joi.string().required(),
    companyname: Joi.string().required(),
    price: Joi.string().required()
});

module.exports = { productSchema };
