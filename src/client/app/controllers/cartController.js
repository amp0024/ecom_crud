angular.module('ecomApp')
  .controller('CartCtrl', ['$scope', 'cartFactory', function($scope, cartFactory){
    function getCheckout(){
      cartFactory.getCheckout()
      .success(function(data) {
          console.log(data);
          $scope.checkout = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
    }
    getCheckout();
  }]);