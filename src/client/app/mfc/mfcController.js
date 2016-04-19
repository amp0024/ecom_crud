angular.module('ecomApp')
  .controller('MfcCtrl', ['$scope', 'mfcFactory', function($scope, mfcFactory){
    $scope.createMfc = function(){
      //Add Scope
      mfcFactory.createMfc($scope.mfc, $scope.username, $scope.password)
      .success(function(data) {
          window.location = '/#/admin';
        }).error(function(error) {
          $scope.status = 'Unable to load manufacturer data: ' + error.message;
        });
    };
  }])
  .controller('AllMfcCtrl', ['$scope', 'mfcFactory', function($scope, mfcFactory){
    function getManuf(){
      mfcFactory.getManufacturers()
        .success(function(data) {
          $scope.manufacturers = data;
        }).error(function(error){
          $scope.status = 'Unable to load manufacturer data: ' + error.message;
        });
      }
    getManuf();
  }])
  .controller('SingleMfcCtrl', ['$scope', 'mfcFactory', 'productFactory','orderFactory', '$localStorage', function($scope, mfcFactory, productFactory, orderFactory, $localStorage){
    var mfc_id = $localStorage.mfc_id;
    function getMfcProducts(){
      productFactory.getProductByMfc(mfc_id)
        .success(function(data){
          $scope.mfcProducts = data;
        }).error(function(error){
          $scope.status = 'Unable to load manufacturer product data: ' + error.message;
        })
    }
    getMfcProducts();

    function getMfcOrders(){
      orderFactory.getOrdersByMfc(mfc_id)
        .success(function(data){
          console.log(data);
          $scope.orders = data;
        })
        .error(function(error){
          $scope.status = 'Unable to load order data: ' + error.message;
        })
    }
    getMfcOrders();

  }]);