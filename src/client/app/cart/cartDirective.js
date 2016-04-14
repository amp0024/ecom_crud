angular
    .module('ecomApp')
    .directive('shoppingCart', shoppingCart);

function shoppingCart() {
    var directive = {
        templateUrl: './app/cart/cart.html',
        restrict: 'EA'
    };
    return directive;

}