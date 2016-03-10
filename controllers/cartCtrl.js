const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');

module.exports = {

  create: (req, res, next) => {
    User.findByIdAndUpdate(req.params.user_id, {$push: req.body})
    .then((err, s) => {
      err ? res.status(500).send(err) : res.status(200).send(s);
    })
  },


  update: (req, res, next) => {
    if (req.query.quantity === 0) {
      User.findById(req.params.user_id)
      .then((err, s) => {
        s.cart.pull(req.query.name).save((err, success) => {
          err ? res.status(500).send(err) : res.status(200).send(success);
        })
      })
    }
  }
}
