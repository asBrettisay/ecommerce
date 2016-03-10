const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');
const Cart = require('../models/Cart');

module.exports = {

  create: (req, res, next) => {
    Cart.create(req.body, (err, cart) => {
      return err ? console.log(err) : cart;
    })
    .then((cart) => {
      User.findByIdAndUpdate(req.params.id, {cart: cart._id})
      .then((err, s) => {

        return err ? res.status(500).send(err) : res.status(200).send(s);
      })
    })
  },


  update: (req, res, next) => {

    if (req.query.quantity === 0) {
      User.findById(req.params.user_id)
      .then((s) => {
        console.log('User query result', s);
        s.cart.pull(req.query.name).save((err, success) => {
          err ? res.status(500).send(err) : res.status(200).send(success);
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }



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
      res.status(500).send();
    })
  },

  show: (req, res, next) => {

    User.findById(req.params.id)
    .then((user) => {
      Cart.findById(user.cart)
      .populate('item')
      .exec((err, cart) => {
        err ? res.status(500).send(err) : res.status(200).send(cart);
      })
    })
  }
}
