'strict mode';

describe('adminCtrl', function() {
  beforeEach(module('ecommerce'));


  var testProduct = {
    name: 'Cheese',
    price: '$2.00',
    description: 'Some powerful and elegant cheese',
    _id: '123'
  }

  var controller, productsService, $httpBackend, admin;
  beforeEach(inject(function($controller, _productsService_, $rootScope, $injector){
    scope = $rootScope.$new();
    admin = $controller('adminCtrl', {$scope: scope});
    productsService = _productsService_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('should create a new product', function(done) {


    $httpBackend.expectPOST('/products').respond({status: 200, data: testProduct})

    admin.newProduct(testProduct)
    expect(scope.product).toEqual({});
    done();
  })

  it('should edit a product', function(done) {
    $httpBackend.expectGET('/products').respond({status:200, data: testProduct})

    scope.editProducts()

    expect(scope.editMode).toEqual(true);
    done();
  })

  it('should update a product', function(done) {
    $httpBackend.expectPUT('/products/123').respond({status:200, data: testProduct})
    scope.updateProduct(testProduct);
    done()

    expect(scope.editProductForm).toEqual(false);

  })

  it('should delete a product', function(done) {
    $httpBackend.expectDELETE('/products/123').respond({status: 200, data: testProduct})

    scope.deleteProduct('123');
    done()
    expect(scope.editMode).toEqual(false);
  })

  it('should cancelForm', function() {
    scope.cancelForm();

    expect(scope.editMode).toEqual(false);
  })
})
