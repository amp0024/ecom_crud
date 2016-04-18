angular.module('ecomApp')
  .factory('productFactory', ['$http', function($http){
        var urlBase = '/api/products';
        var cartBase = '/api/safe/carts/';
        var productFactory = {};

        productFactory.getProducts = function() {
          return $http.get(urlBase);
        };

        productFactory.getProduct = function(product_id) {
          return $http.get(urlBase + "/product/" + product_id);
        };

        productFactory.addProduct = function(product){
          return $http.post(urlBase, product);
        };

        productFactory.getProductByMfc = function(mfc_id){
          return $http.get(urlBase + "/mfc/" + mfc_id);
        };

        productFactory.addToCart = function(product_id, cart){
          return $http.post(cartBase+"/"+cart+"/"+product_id);
        };

        productFactory.getCartProducts = function(cart){
          return $http.get(cartBase+"cart/"+cart);
        };

        return productFactory;
  }]);