'use strict'

const faker = require('faker');
const Promise = require('bluebird');
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const Product = require('../../models/product');




module.exports = {


  makeFakeProductsAndSave() {
    //Make a cart of fake products, each product registered exists in the database.
    for (var i = 0, defer = []; i < 4; i++) {
      let p = Product.create({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence()
      })
      defer.push(p);
    }

    return Promise.all(defer).then((arr) => {
      return arr = arr.map(function(item) {
        return {
          item: item._id,
          quantity: 1,
        }
      })
    })
  },

  makeFakeUserAndSave() {
    // Make a fake user, registered in the database.
    let user = {
      name: faker.fake('{{name.firstName}}, {{name.lastName}}'),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return User.create(user);
  },

  makeFakeCartAndSave() {
    return this.makeFakeProductsAndSave().then((products) => {
      let newCart = new Cart({
        products: products
      });
      return newCart.save();
    })
    .then((cart) => {
      return cart;
    })
  },

  makeUserWithCartAndSave() {
  let newUser, newCart;

    return this.makeFakeUserAndSave().then((user) => {
      newUser = user;
      return this.makeFakeCartAndSave().then((cart) => {
        return user.update({cart: cart._id})
      })
    })
    .then((user) => {
      return User.findById(newUser._id)
    })

  },

  clearDatabase() {

    let userP = User.remove({}).exec()
    let cartP = Cart.remove({}).exec()
    let productP = Product.remove({}).exec()

    return Promise.join(productP, userP, cartP);
  },

  beforeCartCtrlTests: () => {

  }
};
