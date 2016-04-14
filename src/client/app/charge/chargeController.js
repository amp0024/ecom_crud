angular
  .module('ecomApp')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', '$localStorage'];
function PaymentController($http, $localStorage) {
  var self = this;

  var cart = $localStorage.cart;
  var user = $localStorage.user;
  console.log(cart);
  self.card = {};
  self.payee = null;
  self.amount = null;
  self.paymentSuccessful = true;

  self.pay = function() {
    Stripe.card.createToken(self.card, function(status, response) {
      if(status === 200) {
        var data = {
          cart: cart,
          user: user,
          card: self.card,
          token: response.id,
          amount: self.amount,
          currency: "usd",
          payee: self.payee
        };

        $http
          .post('/api/charge', data)
          .then(function(res) {
            if(res.status === 200) {
              self.paymentSuccessful = true;
            }
            else {
              self.paymentSuccessful = false;
            }
          });
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
