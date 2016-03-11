angular.module('ecommerce', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html',
      controller: 'mainCtrl',
      resolve: {
        userInfoTest: function(userService) {
          return userService.getUserInfo();
        }
      }
    })
    .state('products', {
      url: '/products',
      templateUrl: './views/products.html',
      controller: 'productsCtrl',
      controllerAs: 'vw',
      resolve: {
        products: function(productsService) {
          return productsService.getProducts();
        }
      }
    })
    .state('admin', {
      url: '/admin',
      templateUrl: './views/admin.html',
      controller: 'adminCtrl',
      controllerAs: 'admin'
    })
    .state('admin.edit', {
      templateUrl: './views/adminEdit.html'
    })
    .state('admin.newUser', {
      templateUrl: './views/adminNewUser.html'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: './views/cart.html',
      controller: 'cartCtrl',
      controllerAs: 'cart',
      resolve: {
        cart: function(cartService) {
          return cartService.getUserCart();
        }
      }
    })
})
