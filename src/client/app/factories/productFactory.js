angular.module('ecomApp')
  .factory('productFactory', ['$http', function($http){
        var urlBase = '/api/products';
        var productFactory = {};

        productFactory.getProducts = function() {
          return $http.get(urlBase);
        };

        return productFactory;
  }]);