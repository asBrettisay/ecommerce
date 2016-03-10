'use strict'

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

module.exports = {

  create: (req, res, next) => {
    Cart.create(req.body, (err, cart) => {
      return err ? console.log(err) : cart;
    })
    .then((cart) => {
      return User.findByIdAndUpdate(req.params.id, {$set: {cart: cart._id}})
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log(error);
    })
  },


  update: (req, res, next) => {

    User.findById(req.params.id)
    .then((user) => {
      return Cart.findById(user.cart);
    })


    .then((cart) => {
      cart.products.push(req.body._id);
      cart.save()
      res.status(200).send();
    })


    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },

  show: (req, res, next) => {
    let targetUser;
    User.findById(req.params.id)
    .then((user) => {
      return Cart.findById(user.cart)
    })
    .then((cart) => {
      cart.products = cart.products.map(function(product) {
        Product.findById(product.item, (err, item) => {
          if (err) console.log(err);
          return item;
        })
      })

      return Promise.all(cart.products).then((products) => {
        cart.products = products;
        return cart;
      })
    })
    .then((cart) => {
      res.status(200).send(cart)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  }
}
