'use strict'

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
  create: (req, res, next) => {
    let thisUser;
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      }
      thisUser = user;
      return user;
    })
    .populate('cart')


    .then((user) => {
      let products = [];
      user.cart.products.forEach((product) => {
        let p = Product.findById(product.item)
        products.push(p);
      })

      return Promise.all(products);
    })


    .then((products) => {
      return new Order({
        user: thisUser._id,
        products: products
      })
    })


    .then((order) => {
      thisUser.orders.push(order._id);
      return order.save()
    })


    .then((success) => {
      thisUser.cart = [];
      thisUser.save()
      res.status(200).send(success);

    })
    .catch((error) => {
      console.log(error);
    })
  },

  show: (req, res, next) => {
    User.find({orders: req.query}, (err, s) => {
      err ? res.status(500).send(err) : res.status(200).send(s);
    })
  }
};
