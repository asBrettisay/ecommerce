angular.module('ecommerce')
.directive('flashMessage', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element, attrs) {
      scope.$watch('model', function() {
        console.log('Changing message!')
        element.text(scope.model);
        // element.show();
      })
    },
    replace: true
  }
})
