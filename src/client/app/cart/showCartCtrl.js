angular.module('ecomApp')
  .controller('ShowCartCtrl', ['$scope', '$http', '$routeParams', 'productFactory', 'cartFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, cartFactory, $localStorage){

    $scope.token = $localStorage.token;
    $scope.showCart = true;

    function getCartProducts(){
      var token = $localStorage.token;
      var cart = cartFactory.getLocalCart();
      console.log("Cart to show: ", cart);
      productFactory.getCartProducts(cart)
        .success(function(data){
          var cart = {id: cart, items: {}};
            data.forEach(function(item){
              if (!cart.items[item.product_id]){
                cart.items[item.product_id] = 1;
              } else {
                cart.items[item.product_id] += 1;
              }
            });
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