angular.module('ecomApp')
  .factory('productFactory', ['$http', function($http){
        var urlBase = '/api/products';
        var productFactory = {};

        productFactory.getProducts = function() {
          return $http.get(urlBase);
        };

        productFactory.getProduct = function(product_id) {
          return $http.get(urlBase + "/" + product_id);
        };

        productFactory.addToCart = function(product_id, cart){
          return $http.post("/api/safe/carts/"+cart+"/"+product_id);
        };

        return productFactory;
  }]);