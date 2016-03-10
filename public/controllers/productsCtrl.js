angular.module('ecommerce')
.controller('productsCtrl', function($scope, products, cartService) {
  this.products = products;

  this.addToCart = function (product) {
    cartService.addToCart(product);
  }
})
