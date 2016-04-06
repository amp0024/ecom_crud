angular.module('ecomApp')
  .controller('CartCtrl', ['$scope', 'cartFactory', '$localStorage', function($scope, cartFactory, $localStorage){
    function getCheckout(){
      var cart = $localStorage.cart;
      cartFactory.getCheckout(cart)
      .success(function(data) {
          $scope.checkout = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
    }
    getCheckout();
  }]);