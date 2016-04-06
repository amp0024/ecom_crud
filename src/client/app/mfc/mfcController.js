angular.module('ecomApp')
  .controller('MfcCtrl', ['$scope', 'mfcFactory', function($scope, mfcFactory){
    $scope.createMfc = function(){
      //Add Scope
      mfcFactory.createMfc($scope.mfc, $scope.username, $scope.password)
      .success(function(data) {
          window.location = '/#/admin';
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
    };
  }]);