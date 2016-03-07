var mongojs = require('mongojs'),
    db = mongojs('ecommerce'),
    ObjectId = mongojs.ObjectId;


module.exports = {
  create: function(req, res, next) {
    console.log(req.body);
    res.status(200).send();
  },

  index: function(req, res, next) {
    console.log(req.body);
    res.status(200).send();
  },

  show: function(req, res, next) {
    console.log(req.params);
    res.status(200).send();
  },

  update: function(req, res, next) {
    console.log(req.params);
    res.status(200).send();
  },

  delete: function(req, res, next) {
    console.log(req.params);
    res.status(200).send();
  }
}
