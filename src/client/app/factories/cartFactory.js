angular.module('ecomApp')
  .factory('cartFactory', ['$http', function($http){
        var urlBase = '/api/safe/carts';
        var cartFactory = {};
        cartFactory.createCart = function() {
          return $http.post(urlBase);
        };
        cartFactory.getProduct = function(product_id) {
          return $http.get(urlBase + "/" + product_id);
        };
        cartFactory.getCheckout = function(cart_id){
          return $http.get(urlBase + "/checkout");
        };
        return cartFactory;
  }]);