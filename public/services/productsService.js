angular.module('ecommerce')
.service('productsService', function($http) {




  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/products'
    }).then(function(data) {
      if (data.status === 200) {
        return data.data
      } else {
        console.log(data.status);
        return 'Error';
      }
    }, function(err) {
      return err;
    })
  }



  this.newProduct = function(product) {
    return $http({
      method: 'POST',
      url: '/products',
      data: product
    }).then(function(r) {
      console.log(r.status);
      if (r.status === 200) {
        return r.data;
      } else {
        return 'Error';
      }
    })
  },

  this.updateProduct = function(product) {
    return $http({
      method: 'PUT',
      url: '/products/' + product._id,
      data: product
    })
  }


  this.deleteProduct = function(productId) {
    return $http({
      method: 'Delete',
      url: '/products/' + productId
    })
  }
})
