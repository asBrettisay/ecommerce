angular.module('ecommerce')
.service('messageService', function($rootScope){
  this.alertSuccess = function(message) {
    console.log('In alertSuccess');
    $rootScope.$broadcast('alertMessage', message)
  }
})
