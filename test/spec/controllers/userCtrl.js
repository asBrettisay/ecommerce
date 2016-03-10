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

chai.use(chaiHttp);

describe('userCtrl', function() {

  function newTestUser() {
    return {
      name: faker.fake('{{name.firstName}}, {{name.lastName}}'),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cart: [],
      orders: [],
    }
  };

  var testUser;

  beforeEach((done) => {
    testUser = newTestUser();
    User.create(testUser, (err, s) => {
      if (err) {
        console.log(err);
      }
      testUser = s;
      done();
    })
  })

  it('should show a user', (done) => {
    chai.request(server)
      .get('/api/user/' + testUser._id)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(200);
        res.should.be.a('object');
        res.should.have.property('body');
        res.body.should.have.property('name');
        let user = res.body;
        user.name.should.equal(testUser.name);
        user.should.have.property('email');
        user.email.should.equal(testUser.email);
        user.should.have.property('password');
        user.password.should.equal(testUser.password);
        user.should.have.property('cart');
        user.should.have.property('orders');
        user.cart.should.be.a('array');
        user.orders.should.be.a('array');
        done();
      })
  })

  it('should create a new user', (done) => {
    let newUser = newTestUser();
    chai.request(server)
    .post('/api/user')
    .send(newUser)
    .end((err, res) => {
      if (err) {
        console.log(err)
      }
      res.should.have.status(200);
      res.should.be.a('object');
      res.should.have.property('body');
      let user = res.body;
      user.name.should.equal(newUser.name);
      user.should.have.property('email');
      user.email.should.equal(newUser.email);
      user.should.have.property('password');
      user.password.should.equal(newUser.password);
      user.should.have.property('cart');
      user.cart.should.be.a('array');
      user.should.have.property('orders');
      user.orders.should.be.a('array');
      user.should.have.property('_id');

      User.findById(user._id, (err, s) => {
        if (err) console.log(err);
        s.should.have.property('password');
        s.password.should.equal(user.password);
        done();
      })
    })
  })

})
