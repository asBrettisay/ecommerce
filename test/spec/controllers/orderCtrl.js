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
const Order = require('../../../models/Order');
const Promise = require('bluebird');
const testHelper = require('../../helpers/database');

chai.use(chaiHttp);






describe('orderCtrl', () => {

  var testUser;
  beforeEach((done) => {

    testHelper.clearDatabase()
    .then(() => {
      return testHelper.makeUserWithCartAndSave()
    })
    .then((user) => {
      testUser = user;
      done();
    })
    .catch((error) => {
      console.log('Error before test', error);
    })
  })

  it('should create a new order from a users cart', (done) => {
    chai.request(server)
      .post('/api/order/' + testUser._id)
      .send(testUser)
      .end((err, res) => {
        // if (err) console.log(err);
        res.should.have.status(200);
        res.should.be.a('object');
        let order = res.body;
        order.should.be.a('object');
        order.should.have.property('_id');

        Order.findById(order._id, (err, result) => {
          if (err) {
            console.log(err)
          }
          result.should.be.a('object');
          result.should.have.property('_id');
          result._id.should.equal(order._id);
        })
        done();
      })
  });

  it('should show a users past orders', (done) => {
    chai.request(server)
      .get('/api/order/' + testUser._id)
      .end((err, res) => {
        if (err) console.log(err);
        res.should.have.status(200);
        res.should.be.a('object');
        console.log(res.body);
        done();
      })
  });


})
