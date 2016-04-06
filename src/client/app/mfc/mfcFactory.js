angular.module('ecomApp')
  .factory('mfcFactory', ['$http', function($http){
        var urlBase = '/api/manufacturers ';
        var mfcFactory = {};

        mfcFactory.getManufacturers = function() {
          return $http.get(urlBase);
        };

        mfcFactory.createMfc = function(mfc, username, password){
          var reqbody = {
            mfc: mfc,
            username: username,
            password: password
          };
          return $http.post(urlBase, reqbody);
        };

        return mfcFactory;
}]);