//Need to refactor controllers to the following style:
//Should also wrap in IIFE and use ControllerAs

(function(){
  'use strict';

  angular
    .module('ecomApp')
    .controller('CustomerCtrl', CustomerCtrl)

  CustomerCtrl.$inject = ['$scope', '$localStorage', '$http', 'customerService'];

  function CustomerCtrl($scope, $localStorage, $http, customerService){

    $scope.createCustomer = function(){
      var customer = $scope.customer;
      customer.user_id = $localStorage.user;
      console.log(customer);
      customerService.createCustomer(customer)
        .success(function(data){
          console.log(data);
        }).error(function(error){
          $scope.status = error.message;
        });
    }
    $scope.createStripeCustomer = function(){
      console.log($scope.card);
      Stripe.card.createToken($scope.card, function(status, response){
        console.log(status);
        if (status === 200){
          var data = {
            token: response.id,
            card: $scope.card
          }
        }
        $http
          .post('api/customers/profile', data)
          .then(function(data){
            console.log(data);
          });
      })
    }
  }
})();
