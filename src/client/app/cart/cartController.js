angular.module('ecomApp')
  .controller('CartCtrl', ['$scope', 'cartFactory', '$localStorage', function($scope, cartFactory, $localStorage){
    function getCheckout(){
      var cart = $localStorage.cart;
      cartFactory.getCheckout(cart)
      .success(function(data) {
          console.log("Data ", data);
          $scope.checkout = data;
        }).error(function(error) {
          $scope.status = 'Unable to load cart data: ' + error.message;
        });
    }
    getCheckout();
  }]);