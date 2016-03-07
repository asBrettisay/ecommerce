angular.module('ecommerce', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'mainCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: './views/products.html',
      controller: 'productsCtrl',
      resolve: {
        products: function(productsService) {
          productsService.getProducts();
        }
      }
    })
})