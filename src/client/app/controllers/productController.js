 angular.module('ecomApp')
  .controller('productCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    function getProducts(){
      productFactory.getProducts()
        .success(function(data) {
          console.log(data);
          $scope.products = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getProducts();

    $scope.createProduct = function(){
      console.log($localStorage.site_id);
      var product = $scope.product;
      product.mfc_id = $localStorage.site_id;
      console.log(product);
      productFactory.addProduct(product)
        .success(function(data){
          window.location ='/#/admin';
        }).error(function(error){
          $scope.status = error.message;
        });
    };
  }])
  .controller('singleProductCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    var product_id = $routeParams.product_id;
    function getProduct(product_id){
      productFactory.getProduct(product_id)
        .success(function(data) {
          console.log(data);
          $scope.products = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getProduct(product_id);

    $scope.addToCart = function(){
      var cart = $localStorage.cart;
      var product_id = $routeParams.product_id;
            console.log(cart, product_id);

      productFactory.addToCart(product_id, cart)
        .success(function(data){
          window.location ='/';
        }).error(function(error){
          $scope.status = error.message;
        });
    };
  }]);
