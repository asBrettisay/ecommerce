angular.module('ecommerce')
.service('productsService', function() {
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/products'
    }).then(function(data) {
      return data.data;
    })
  }
})