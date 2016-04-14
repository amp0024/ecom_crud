angular.module('ecomApp')
  .controller('OmniCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    $scope.token = $localStorage.token;
    $scope.showCart = false;

    function getCartProducts(){
      var token = $localStorage.token;
      var cart = $localStorage.cart;
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