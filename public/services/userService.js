angular.module('ecommerce')
.service('userService', function($http, $q) {


  this.getUserInfo = function() {

    return $http({
      method: "GET",
      url: '/api/user/' + '56e25c2470f9db660c9e911c',
    })
    .then(function(response) {
      console.log(response);
      return $q.when(response.data.name);
    })
  }
})
