//Need to refactor controllers to the following style:
//Should also wrap in IIFE and use ControllerAs


  'use strict';

  angular
    .module('ecomApp')
    .controller('CustomerCtrl', CustomerCtrl)

  CustomerCtrl.$inject = ['$scope', '$localStorage', 'customerService'];

  function CustomerCtrl($scope, $localStorage, customerService){

    $scope.createCustomer = function(){
      var customer = $scope.customer;
      console.log(customerService.createCustomer());
      customerService.createCustomer(customer)
        .success(function(data){
          window.location ='/#/';
        }).error(function(error){
          $scope.status = error.message;
        });
    }
  }
