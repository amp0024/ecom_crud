angular.module('ecomApp')
  .factory('productFactory', ['$http', function($http){
        var urlBase = '/api/products';
        var cartBase = '/api/safe/carts/';
        var productFactory = {};

        productFactory.getProducts = function() {
          return $http.get(urlBase);
        };

        productFactory.getProduct = function(product_id) {
          return $http.get(urlBase + "/" + product_id);
        };

        productFactory.addToCart = function(product_id, cart){
          return $http.post(cartBase+"/"+cart+"/"+product_id);
        };

        productFactory.getCartProducts = function(cart){
          console.log("Cart!!!", cart);
          console.log(cartBase+"cart");
          return $http.get(cartBase+"cart/"+cart);
        };

        return productFactory;
  }]);