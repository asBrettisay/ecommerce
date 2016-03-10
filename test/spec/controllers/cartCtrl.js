'use strict'

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const should = chai.should();
const expect = chai.expect;
const Product = require('../../../models/Product');
const faker = require('faker');
const User = require('../../../models/User');
const Cart = require('../../../models/Cart');
const Promise = require('bluebird');
const testHelper = require('../../helpers/database');

chai.use(chaiHttp);







describe('cartCtrl', () => {

  let testCart, testUser, testProduct;

  before((done) => {
    testHelper.makeCartObject().then((cart) => {
      testCart = cart;
    })
    .then(() => {
      testHelper.makeFakeUserAndSave().then((user) => {
        testUser = user;
      })
    })
    .then(() => {
      testHelper.makeFakeProduct().then((product) => {
        testProduct = product;
        done();
      })
    })
  })


  it('should create a new cart', (done) => {

    chai.request(server)
    .post('/api/cart/' + testUser._id)
    .send(testCart)
    .end((err, res) => {

      res.status.should.equal(200);
      res.should.be.a('object');
      res.should.have.property('body');
      let user = res.body;


      User.findById(user._id)
      .populate('cart')
      .exec((err, user) => {
        user.should.have.property('cart');
        testUser = user;
        done();
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

      testCart._id = cart._id;

      done();
    })
  })

  it('should update a cart with a product', (done) => {

    chai.request(server)
      .put('/api/cart/' + testUser._id)
      .send(testProduct)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.should.have.property('body');
        done();
      })
    })
})
