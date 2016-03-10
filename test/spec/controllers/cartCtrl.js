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
const testHelper = require('../../helpers/database');

chai.use(chaiHttp);






describe('cartCtrl', () => {

  afterEach((done) => {
    testHelper.clearDatabase().then(() => {
      done();
    })
  })




  var testUser, testCart;
  beforeEach((done) => {

    testHelper.clearDatabase()
    .then(() => {
      Promise.join(
        testHelper.makeFakeUserAndSave(),
        testHelper.makeFakeProductsAndSave(),
        (user, products) => {


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
