const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');
const orderSchema = require('../models/orderSchema');
const productSchema = require('../models/productSchema');

module.exports = {
  create: (req, res, next) => {
    User.findById(req.params.user_id, (err, user) => {
      user.orders = new orderSchema({
        user: user._id,
        products: user.cart.map((product) => {
          return new productSchema(product)
        })
      })
    }).then((user) => {
      user.cart = [];
      user.save().then((err, s) => {
        err ? res.status(500).send(err) : res.status(200).send(s);
      })
    })
  },

  show: (req, res, next) => {
    User.find({orders: req.query}, (err, s) => {
      err ? res.status(500).send(err) : res.status(200).send(s);
    })
  }
};
