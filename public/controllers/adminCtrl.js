angular.module('ecommerce')
.controller('adminCtrl', function($scope, productsService, $state, $timeout, messageService) {
  $scope.showNewProduct = false;

  this.newProduct = function(product) {
    productsService.newProduct(product).then(function(response) {
      this.alertSuccess = 'Product Added.'
    })
    $scope.showNewProduct = false;
    $scope.product = {};
  }

  this.editProducts = function() {
    productsService.getProducts().then(function(data) {
      $scope.products = data;
    })
    $scope.editMode = true;
    $state.go('admin.edit')
  }

  this.updateProduct = function(product) {
    productsService.updateProduct(product).then(function(response) {
      $scope.editProductForm = false;
      console.log(response);
      $state.go('admin.edit', {}, {reload: true})
    })
  }

  this.deleteProduct = function(productId) {
    productsService.deleteProduct(productId).then(function(response) {
      $scope.editMode = false;
      $state.go('admin', {}, {reload: true});
    })
  }

  this.cancelForm = function() {
    $scope.editMode = false;
    $state.go('admin', {}, {reload: true});
  }

  this.newUser = function(user) {
    userService.newUser(user);
  }
})
