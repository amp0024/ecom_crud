angular.module('ecomApp')
  .controller('productCtrl', ['$scope', '$http', '$routeParams', 'productFactory', function($scope, $http, $routeParams, productFactory){

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
  }]);
