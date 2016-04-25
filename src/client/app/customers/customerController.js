//Need to refactor controllers to the following style:
//Should also wrap in IIFE and use ControllerAs

(function(){
  'use strict';

  angular
    .module('ecomApp')
    .controller('CustomerCtrl', CustomerCtrl)

  CustomerCtrl.$inject = ['$scope', '$localStorage', '$http', 'customerService'];

  function CustomerCtrl($scope, $localStorage, $http, customerService){
    $scope.createStripeCustomer = function(){
      console.log($scope.card);
      var customer = $scope.customer;
      customer.user_id = $localStorage.user;
      Stripe.card.createToken($scope.card, function(status, response){
        console.log(status);
        if (status === 200){
          var data = {
            token: response.id,
            card: $scope.card,
            customer: $scope.customer
          }
        }
        $http
          .post('api/customers/profile', data)
          .then(function(data){
            console.log(data);
          });
      })
    }

  function showCard(){
    var user_id = $localStorage.user;
    return customerService.cardOnFile(user_id).then(function(data){
      console.log(data);
      $scope.showCard = data;
    })
  }
  showCard();

  }

})();
