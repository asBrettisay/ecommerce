const mongoose = require('mongoose'),
      cartSchema = require('./cartSchema');

var userSchema =  new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  cart: [cartSchema],
  orders: []
})

module.exports = mongoose.model('User', userSchema);
