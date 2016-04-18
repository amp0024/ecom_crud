angular.module('ecomApp')
  .factory('orderFactory', ['$http', '$localStorage', function($http, $localStorage){
        var urlBase = '/api/purchases/user';
        var orderFactory = {};
        var user_id = $localStorage.user;


        orderFactory.getorders = function() {
          return $http.get(urlBase);
        };

        orderFactory.getOrderByUser = function(user_id) {
          return $http.get(urlBase + "/" + user_id);
        };

        orderFactory.setOrdered = function(){
          $localStorage.setOrdered = !$localStorage.setOrdered;
          console.log($localStorage.setOrdered);
          return $localStorage.setOrdered;
         } ;

        return orderFactory;
  }]);