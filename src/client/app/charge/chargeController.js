angular
  .module('ecomApp')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http','$window', '$localStorage', 'cartFactory','orderFactory'];
function PaymentController($http, $window, $localStorage, cartFactory, orderFactory) {
  var self = this;

  var cart = cartFactory.getLocalCart();
  var user = $localStorage.user;
  self.ship = {};
  self.card = {};
  self.payee = null;
  self.amount = null;

  self.pay = function() {
    Stripe.card.createToken(self.card, function(status, response) {
      if(status === 200) {
        var data = {
          ship: self.ship,
          cart: cart,
          user: user,
          card: self.card,
          token: response.id,
          amount: self.amount,
          currency: "usd",
          payee: self.payee
        };
        //Need to break this out into more logical promises
        $http
          .post('/api/charge', data)
          .then(function(res) {
            if(res.status === 200) {
                console.log();
                $localStorage.setOrdered = true;
              $http.post('/api/safe/carts', {'user': user}).then(function(response){
                cartFactory.setLocalCart(response.data.cart);
                //Why is the cart not being taken out of the cart popup when this is called?
                console.log("Cart! ",   $localStorage.cart);
                console.log("New Cart ID", response.data.cart);
                $window.location.href = '/';
              })
            }
            else {

              self.paymentSuccessful = $localStorage.setOrdered;
            }
          })
      }
    });
  }

  self.reset = function() {
    self.card = {};
    self.payee = "";
    self.amount = null;
    self.paymentSuccessful = false;
    self.Form.$setPristine(true);
    // use vanilla JS to reset form to remove browser's native autocomplete highlighting
    document.getElementsByTagName('form')[0].reset();
  }
}
