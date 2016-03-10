angular.module('ecommerce')
.controller('cartCtrl', function($scope, cart) {
  this.userCart = cart;
})
