  angular
    .module('ecomApp')
    .directive('shoppingCart', shoppingCart);

function shoppingCart() {
    var directive = {
        templateUrl: './app/cart/cart.html',
        restrict: 'EA',
        controller: 'ShowCartCtrl'
    };
    return directive;

}