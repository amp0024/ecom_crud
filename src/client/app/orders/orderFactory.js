angular.module('ecomApp')
  .factory('orderFactory', ['$http', '$localStorage', function($http){
        var urlBase = '/api/purchases/user';
        var orderFactory = {};
        var user_id =

        orderFactory.getorders = function() {
          return $http.get(urlBase);
        };

        orderFactory.getOrderByUser = function(user_id) {
          return $http.get(urlBase + "/" + user_id);
        };

        return orderFactory;
  }]);