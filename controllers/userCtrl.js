const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const User = require('../models/User');

module.exports = {
  show: (req, res, next) => {
    User.findById(req.params.id)
    .populate('User')
    .exec((err, s) => {
      err ? res.status(500).send(err) : res.status(200).send(s);
    })
  },

  create: (req, res, next) => {
    User.create(req.body, (err, s) => {
      err ? res.status(500).send(err) : res.status(200).send(s);
    })
  }
}
