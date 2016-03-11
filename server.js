'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    products = require('./controllers/productsCtrl'),
    config = require('./_config'),
    mongoose = require('mongoose'),
    users = require('./controllers/userCtrl'),
    orders = require('./controllers/orderCtrl'),
    cart = require('./controllers/cartCtrl'),
    keys = require('./keys.js'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require('express-session'),
    User = require('./models/User'),
    faker = require('faker');



var app = express();


mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to database: ' + config.mongoURI[app.settings.env])
  }
})

app.use(passport.initialize());
app.use(passport.session());


var loggedInUser;
passport.use(new FacebookStrategy({
  clientID: keys.facebookAppId,
  clientSecret: keys.facebookSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (token, tokenSecret, profile, done) => {

  User.findOne({fbID: profile.id}, (err, user) => {

    return user;
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: profile.displayName,
        email: faker.internet.email(),
        password: faker.internet.password(),
        fbID: profile.id
      })
    } else {
      return user;
    }

  })
  .then(user => {
    loggedInUser = user;
    done(null, user)
  })
  .catch(err => { console.log(err) });

}))


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: keys.appSecret,
  resave: true,
  saveUninitialized: true
}));





passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log(obj);
  done(null, obj);
});



var requireAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    console.log(req.body);
    return next();
  }
  return res.redirect('/login');
};


var port = 3000;
app.listen(port, function() {
  console.log('A Lannister always pays his debts...')
})

app.post('/api/user', users.create);
app.get('/api/user/:id', users.show);

app.post('/products', products.create);
app.get('/products', products.index);
app.get('/products/:id', products.show);
app.put('/products/:id', products.update);
app.delete('/products/:id', products.delete);

app.post('/api/order/:id', orders.create);
app.get('/api/order/:id', orders.show);

app.post('/api/cart/:id', cart.create);
app.get('/api/cart/:id', cart.show);
app.put('/api/cart/:id', cart.update);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}), (req, res) => {
  req.session.userId = loggedInUser._id;

}, (err) => {
  if (err) {
    res.redirect('/auth/facebook');
  }

});

app.get('/', requireAuth, (req, res) => {
  return res.sendFile(__dirname + '/public.index.html');
});



module.exports = app;
