const mongoose = require('mongoose');

var userSchema =  new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  fbID: {type: String, unique: true},
  cart: {type: String, ref: "Cart"},
  orders: []
})

module.exports = mongoose.model('User', userSchema);
