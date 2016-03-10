'use strict'

const faker = require('faker');
const Promise = require('bluebird');
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const Order = require('../../models/Order');




module.exports = {


  makeFakeProductsAndSave() {
    //Make a cart of fake products, each product registered exists in the database.
    for (var i = 0, defer = []; i < 4; i++) {
      let fakeObj = {
        price: faker.commerce.price().toString(),
        name: faker.commerce.productName().toString(),
        description: faker.lorem.sentence()
      }

      let p = new Product({
        price: fakeObj.price,
        name: fakeObj.name,
        description: fakeObj.description
      })
      defer.push(p.save());
    }

    return Promise.all(defer).then((arr) => {
      arr = arr.map(function(item) {

        return {
          item: item._id,
          quantity: 1,
        }
      })
      return arr;
    })
    .catch((error) => {
      console.log(error);
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
    // Make a fake cart, register it in the database.
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
    // Make a fake cart, user, and add cart ID to user.
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

  makeFakeProduct() {
    return Product.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence()
    })
  },

  clearDatabase() {

    let userP = User.remove({}).exec()
    let cartP = Cart.remove({}).exec()
    let productP = Product.remove({}).exec()
    let orderP = Order.remove({}).exec()

    return Promise.join(productP, userP, cartP, orderP);
  },

  makeCartObject() {
    return this.makeFakeProductsAndSave().then((products) => {
      return {
        products: products
      }
    })
  }
};
