angular.module('ecomApp')
  .factory('orderFactory', ['$http', '$localStorage', function($http, $localStorage){
        var urlBase = '/api/purchases/';
        var orderFactory = {};
        var user_id = $localStorage.user;


        orderFactory.getorders = function() {
          return $http.get(urlBase);
        };

        orderFactory.getOrderByUser = function(user_id) {
          return $http.get(urlBase + "user/" + user_id);
        };

        orderFactory.getOrdersByMfc = function(mfc_id){
          return $http.get(urlBase + "mfc/" + mfc_id);
        }

        orderFactory.setOrdered = function(){
          $localStorage.setOrdered = !$localStorage.setOrdered;
          console.log($localStorage.setOrdered);
          return $localStorage.setOrdered;
         } ;

         orderFactory.changeStatus = function(order_id){
          return $http.post(urlBase + "order/" + order_id);
         }

        return orderFactory;
  }]);