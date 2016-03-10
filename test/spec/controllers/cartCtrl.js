'use strict'

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const should = chai.should();
const expect = chai.expect;
const Product = require('../../../models/product');
const faker = require('faker');
const User = require('../../../models/User');
const Cart = require('../../../models/Cart');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('cartCtrl', () => {


  function newFakeProducts() {

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
  }

  function newFakeUser() {

    // Make a fake user, registered in the database.
    let user = {
      name: faker.fake('{{name.firstName}}, {{name.lastName}}'),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return User.create(user);
  };

  function clearDatabase() {

    let userP = User.remove({}).exec()
    let cartP = Cart.remove({}).exec()
    let productP = Product.remove({}).exec()

    return Promise.join(productP, userP, cartP);
  };





  afterEach((done) => {
    clearDatabase().then(() => {
      done();
    })
  })




  var testUser, testCart;
  beforeEach((done) => {

    clearDatabase().then(() => {
      Promise.join(newFakeUser(), newFakeProducts(), (user, products) => {
        testUser = user;
        testCart = {
          products: products
        }

        Cart.create(testCart)
        .then((cart) => {
          testUser.cart = cart._id;
          return testUser;
          done();
        })
        .then((user) => {
          user.save((err, s) => {
            if (err) console.log(err);
            done();
          })
        })

      })
    })
  })

  it('should show one cart from userId', (done) => {
    chai.request(server)
    .get('/api/cart/' + testUser._id)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      res.should.have.property('body');
      let cart = res.body;

      cart.should.have.property('products');

      done();
    })
  })



  it('should create a new cart', (done) => {

    chai.request(server)
    .post('/api/cart/' + testUser._id)
    .send(testCart)
    .end((err, res) => {
      if (err) {
        console.log(err);
        done();
      }
      res.status.should.equal(200);
      res.should.be.a('object');
      res.should.have.property('body');
      let user = res.body;

      cart.should.be.a('array');
      cart[0].should.be.a('object');
      cart[0].should.have.property('item');
      cart[0].item.should.equal(testCart[0].item)
      cart[0].should.have.property('quantity')

      Cart.findById(testCart._id, (err, s) => {
        if (err) console.log(err);

        s.should.be.a('array');
        s[0].should.equal(testCart[0]);
        done();
      })
    })
  })

})
