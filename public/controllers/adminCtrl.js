angular.module('ecommerce')
.controller('adminCtrl', function($scope, productsService) {
  $scope.showNewProduct = false;

  $scope.newProduct = function(product) {
    productsService.newProduct(product);
    $scope.showNewProduct = false;
    $scope.product = {};
  }

  $scope.admin = true;
})
