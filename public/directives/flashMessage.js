angular.module('ecommerce')
.directive('flashMessage', function() {
  return {
    restrict: 'A',
    scope: {
      message: '='
    },
    link: function(scope, element, attrs) {
      scope.$watch('message', function() {
        element.text(scope.message);
      })
    }
  }
})
