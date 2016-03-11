angular.module('ecommerce')
.controller('nav', function($scope, $state, userService) {

  this.isActive = function(state) {
    return $state.is(state);
  }

  userService.getUserInfo()
    .then(function(data) {
      console.log('Data in controller is', data);
      $scope.userInfo = data;
    })


})
