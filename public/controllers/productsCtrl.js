angular.module('ecommerce')
.controller('productsCtrl', function($scope, products) {
  this.products = products;

  this.addToCart = function (product) {
    //service to add to Card.
  }
})
