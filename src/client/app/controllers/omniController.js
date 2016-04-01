angular.module('ecomApp')
  .controller('OmniCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    function getCartProducts(){
      var token = $localStorage.token;
      console.log("Tokeeeen!", token)
      productFactory.getCartProducts(token)
        .success(function(data){
          console.log(data);
          $scope.cart = data;
        }).error(function(error){
          $scope.status = error.message;
        });
    }

    getCartProducts();


  }]);