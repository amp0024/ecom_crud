angular.module('ecomApp')
  .controller('OmniCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    $scope.token = $localStorage.token;
    $scope.showCart = false;

    function getCartProducts(){
      var token = $localStorage.token;
      console.log("Tokeeeen!", token)
      productFactory.getCartProducts(token)
        .success(function(data){
          console.log(data);
          var cart = {id: data[0].cart_id, items: {}};
          data.forEach(function(item){
            if (!cart.items[item.product_id]){
              cart.items[item.product_id] = 1;
            } else {
              cart.items[item.product_id] += 1;
            }
          });
          console.log("CART!!! ", cart);
          $scope.cart = cart;
        }).error(function(error){
          $scope.status = error.message;
        });
    }
    getCartProducts();

    $scope.toggleCart = function(){
      $scope.showCart = !$scope.showCart;
    };

  }]);