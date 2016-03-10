const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var cartSchema = new mongoose.Schema({
  products: [{
    item: {type: ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, min: 1}
  }]
})

module.exports = mongoose.model('Cart', cartSchema);
