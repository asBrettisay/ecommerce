const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const productSchema = require('./productSchema');

var orderSchema = new mongoose.Schema({
  user: {type: String, required: true},
  products: [productSchema]
})

module.exports = orderSchema;
