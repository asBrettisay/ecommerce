const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var orderSchema = new mongoose.Schema({
  user: {type: String, required: true},
  products: []
})

module.exports = mongoose.model('Order', orderSchema);
