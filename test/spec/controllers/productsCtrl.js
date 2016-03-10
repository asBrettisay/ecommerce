process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../server'),
    should = chai.should(),
    expect = chai.expect,
    Product = require('../../../models/Product'),
    faker = require('faker');

chai.use(chaiHttp);

describe('productsCtrl', function() {


  var car = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentence()
  };
  var sandwich = {
      name: 'Sandwich',
      price: '$0.99',
      description: 'A powerful and humble sandwich',
    };

  var testId;


  Product.collection.drop();

  beforeEach(function(done) {
    var newProduct = new Product(sandwich)

    testId = newProduct._id;
    newProduct.save(function(err, s) {
      if (err) {
        console.log(err);
      }
      done();
    })
  });
  afterEach(function(done) {
    Product.collection.drop();
    done();
  });


  it('should create a product', function(done) {

    chai.request(server)
      .post('/products')
      .send(car)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
        res.body.name.should.equal(car.name);
        var carId = res.body._id;


        Product.findById(carId, function(err, s) {
          if (err) {
            console.log(err);
          } else {
            s.should.have.property('_id');
            s.should.have.property('name');
            s.should.have.property('description');
            s.should.have.property('price');
            s.name.should.equal(car.name);
            done();
          }
        })
      });
  });


  it('should list all products', function(done) {
    chai.request(server)
      .get('/products')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('_id');
        done();
      });
  });
  it('should show one product from id', function(done) {
    chai.request(server)
      .get('/products/' + testId)
      .end(function(err, res) {
      
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('name');
        res.body.name.should.equal(sandwich.name);
        done();
      })
  });
  it('should update one product from id', function(done) {
    chai.request(server)
      .put('/products/' + testId)
      .send({name: "porsche"})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;

        Product.find({_id: testId}, function(err, dbRes) {
          dbRes.should.be.a('array');
          dbRes[0].should.be.a('object');
          dbRes[0].should.have.property('name');
          dbRes[0].should.have.property('price');
          dbRes[0].name.should.equal('porsche');
          dbRes[0].price.should.equal(sandwich.price);
          done();
        })
      })
  });
  it('should destroy one product from id', function(done) {
    chai.request(server)
      .delete('/products/' + testId)
      .end(function(err, res) {
        res.should.have.status(200);

        Product.find({_id: testId}, function(err, res) {
          res.should.be.a('array');
          expect(res[0]).to.equal(undefined);
          done();
        })
      })

  });




  it.skip('should not allow duplicate names of products', function(done) {
    chai.request(server)
      .post('/products')
      .send(sandwich)
      .end(function(err, res) {
        if (err) {
          console.log(err)
        } else {
          res.should.have.status(200);

          chai.request(server)
            .post('/products')
            .send(sandwich)
            .end(function(err, res) {
              if (err) {
                // console.log(err);
                done();
              } else {
                res.should.have.status(500);
                done();
              }
            })

          Product.find({name: sandwich.name}, function(err, res) {
            if (err) {
              console.log(err)
            } else {
              res.should.be.a('array');
              console.log(res);
              res.length.should.equal(1);
              done();
            }
          })
        }
      })
  })


})
