 angular.module('ecomApp')
  .controller('OrderCtrl', ['$scope', '$http', '$routeParams', 'orderFactory', '$localStorage', function($scope, $http, $routeParams, orderFactory, $localStorage){
    var user_id = $localStorage.user;
      function getOrders(){
      orderFactory.getOrderByUser(user_id)
        .success(function(data) {
          console.log($localStorage.setOrdered);
          $scope.orders = data;
          $scope.order = data[data.length-1]
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getOrders();
  }]);