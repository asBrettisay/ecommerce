angular.module('ecommerce')
.service('productsService', function($http) {




  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/products'
    }).then(function(data) {
      return data.data;
    })
  }



  this.newProduct = function(product) {
    $http({
      method: 'POST',
      url: '/products',
      data: product
    })
  }
})
