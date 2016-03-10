var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    products = require('./controllers/productsCtrl'),
    config = require('./_config'),
    mongoose = require('mongoose'),
    users = require('./controllers/userCtrl'),
    orders = require('./controllers/orderCtrl'),
    cart = require('./controllers/cartCtrl');


app = express();

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to database: ' + config.mongoURI[app.settings.env])
  }
})


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = 8005
app.listen(port, function() {
  console.log('A Lannister always pays his debts...')
})


app.post('/products', products.create);
app.post('/api/user', users.create);
app.post('/api/order/:id', orders.create);
app.post('/api/cart/:id', cart.create);

app.get('/products', products.index);
app.get('/products/:id', products.show);
app.get('/api/order/:id', orders.show);
app.get('/api/user/:id', users.show);
app.get('/api/cart/:id', cart.show);

app.put('/products/:id', products.update);
app.put('/api/cart/:id', cart.update);

app.delete('/products/:id', products.delete);

module.exports = app;
