angular.module('ecommerce')
.service('cartService', function($http) {

  var userId = '56e11a752b82222e334f0269';
  this.addToCart = function(product) {
    return $http({
      method: 'PUT',
      url: '/api/cart/' + userId,
      data: product
    })
  }

  this.getUserCart = function() {
    return $http({
      method: 'GET',
      url: '/api/cart/' + userId
    })
    .then(function(res) {
      return res.data;
    })
  }
})
