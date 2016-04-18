 angular.module('ecomApp')
  .controller('OrderCtrl', ['$scope', '$http', '$routeParams', 'orderFactory', '$localStorage', function($scope, $http, $routeParams, orderFactory, $localStorage){
    var user_id = $localStorage.user;
      function getOrders(){
      orderFactory.getOrderByUser(user_id)
        .success(function(data) {
          $scope.cart = $localStorage.cart;
          $scope.orders = data;
          $scope.order = data[data.length-1]
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getOrders();
  }])
  .controller('MfcOrderCtrl', ['$scope', '$http', '$routeParams', 'orderFactory', '$localStorage', function($scope, $http, $routeParams, orderFactory, $localStorage){
    var mfc_id = $localStorage;
    console.log(mfc_id);

  }])