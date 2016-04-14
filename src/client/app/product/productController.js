 angular.module('ecomApp')
  .controller('productCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    function getProducts(){
      productFactory.getProducts()
        .success(function(data) {
          $scope.products = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getProducts();

    $scope.createProduct = function(){
      var product = $scope.product;
      product.mfc_id = $localStorage.site_id;
      productFactory.addProduct(product)
        .success(function(data){
          window.location ='/#/admin';
        }).error(function(error){
          $scope.status = error.message;
        });
    };
  }])
  .controller('singleProductCtrl', ['$scope', '$http', '$routeParams', 'productFactory', 'cartFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, cartFactory, $localStorage){

    var product_id = $routeParams.product_id;
    function getProduct(product_id){
      productFactory.getProduct(product_id)
        .success(function(data) {
          $scope.products = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getProduct(product_id);

    $scope.addToCart = function(){
      var cart = cartFactory.getLocalCart();
      var product_id = $routeParams.product_id;
      productFactory.addToCart(product_id, cart)
        .success(function(data){
          window.location ='/';
        }).error(function(error){
          $scope.status = error.message;
        });
    };
  }]);
