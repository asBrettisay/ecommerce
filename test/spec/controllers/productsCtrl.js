process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../../'),
    should = chai.should(),
    expect = chai.expect,
    mongojs = require('mongojs'),
    db = mongojs('ecommerce'),
    Products = db.collection('products'),
    ObjectId = mongojs.ObjectId;

chai.use(chaiHttp);

describe('productsCtrl', function() {


  var testProduct = {
    name: 'Car',
    price: '$999',
    description: 'A powerful and virtuous car'
  };
  var newProduct = {
      name: 'Sandwich',
      price: '$0.99',
      description: 'A powerful and humble sandwich',
    };

  var testId;


  Products.drop();

  beforeEach(function(done) {
    Products.insert(newProduct, function(err, res) {
      testId = res._id;
      done();
    })
  });
  afterEach(function(done) {
    Products.drop();
    done();
  });


  it('should create a product', function(done) {
    var testProduct = {
      name: 'Car',
      price: '$999',
      description: 'A powerful and virtuous car'
    }

    chai.request(server)
      .post('/products')
      .send(testProduct)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
        res.body.name.should.equal(testProduct.name);
        done();
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
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal(newProduct.name);
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

        Products.find({_id: ObjectId(testId)}, function(err, dbRes) {
          dbRes.should.be.a('array');
          dbRes[0].should.be.a('object');
          dbRes[0].should.have.property('name');
          dbRes[0].should.have.property('price');
          dbRes[0].name.should.equal('porsche');
          dbRes[0].price.should.equal(newProduct.price);
          done();
        })
      })
  });
  it('should destroy one product from id', function(done) {
    chai.request(server)
      .delete('/products/' + testId)
      .end(function(err, res) {
        res.should.have.status(200);

        Products.find({_id: ObjectId(testId)}, function(err, res) {
          res.should.be.a('array');
          expect(res[0]).to.equal(undefined);
          done();
        })
      })

  });
})
