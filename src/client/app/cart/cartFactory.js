angular.module('ecomApp')
  .factory('cartFactory', ['$http', '$localStorage', function($http, $localStorage){
        var urlBase = '/api/safe/carts';
        var cartFactory = {};
        cartFactory.createCart = function() {
          return $http.post(urlBase);
        };
        cartFactory.getProduct = function(product_id) {
          return $http.get(urlBase + "/" + product_id);
        };
        cartFactory.getCheckout = function(cart_id){
          return $http.get(urlBase + "/checkout/"+cart_id);
        };
        cartFactory.getLocalCart = function(){
          return $localStorage.cart;
        };
        cartFactory.setLocalCart = function(cart_id){
          $localStorage.cart = cart_id;
        }
        return cartFactory;
  }]);