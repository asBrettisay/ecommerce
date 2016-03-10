var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = new mongoose.Schema({
  name: {type: String, unique: true, index: true},
  price: {type: String, required: true},
  description: {type: String, required: true, min: 0}
})

module.exports = productSchema;
