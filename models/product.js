var mongoose = require('mongoose'),
    mongojs = require('mongojs');

var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  _id: ObjectId
})

module.exports = mongoose.model('product', productSchema);
