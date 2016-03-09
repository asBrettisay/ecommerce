xdescribe('flashMessage', function() {
  beforeEach(module('ecommerce'));

  var testProduct = {
    name: "Cheese",
    price: '$7.95',
    description: "Some powerful and extravagant cheese"
  }

  var $compile, $rootScope, $controller, adminCtrl, $httpBackend;
  beforeEach(inject(function(_$compile_, _$rootScope_, $controller, $injector){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    admin = $controller('adminCtrl', {$scope: {}});
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('displays a message and shows itself when called', function () {

    $httpBackend
      .whenPOST('/products')
      .respond({status:200, data: testProduct});


    var element = $compile("<div flash-message ng-model='admin.alertSuccess'></div>")($rootScope)


    admin.newProduct(testProduct)
    expect(element.html()).toContain('Product Added.')
  })
})
