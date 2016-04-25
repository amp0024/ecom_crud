'use strict';

/* The main app with route configurations */

angular.module('ecomApp', ['ngRoute', 'ngStorage', 'angular-loading-bar', 'ngFlash'])
.config(function($routeProvider, $httpProvider){
    Stripe.setPublishableKey('pk_test_18jB465AmfCTngdGeiBtSqqp');
    $routeProvider
    /* LANDING PAGE */
    .when('/', {
      templateUrl: '/app/views/home.html',
      controller: 'ProductCtrl'
    })
    .when('/products/:product_id', {
      templateUrl: '/app/views/productView.html',
      controller: 'SingleProductCtrl'
    })
    .when('/login', {
      templateUrl: '/app/views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/register', {
      templateUrl: '/app/views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/checkout', {
      templateUrl: '/app/views/checkout.html',
      controller: 'CartCtrl'
    })
    .when('/admin/login', {
      templateUrl: '/app/views/adminlogin.html',
      controller: 'AuthCtrl'
    })
    .when('/admin/register', {
      templateUrl: '/app/views/adminregister.html',
      controller: 'MfcCtrl'
    })
    .when('/admin', {
      templateUrl: '/app/views/admindashboard.html',
      controller: 'SingleMfcCtrl'
    })
    .when('/products', {
      templateUrl: '/app/views/products.html',
      controller: 'ProductCtrl'
    })
    .when('/orders', {
      templateUrl: '/app/orders/orders.html',
      controller: 'OrderCtrl'
    })
    .when('/manufacturers', {
      templateUrl: '/app/views/manufacturers.html',
      controller: 'AllMfcCtrl'
    })
    .when('/product/create', {
      templateUrl: '/app/views/tmpCreateProduct.html',
      controller: 'ProductCtrl'
    })
    .when('/product/:product_id/edit', {
      templateUrl: '/app/views/tmpEditProduct.html',
      controller: 'SingleProductCtrl'
    })
    .when('/profile/:customer_id', {
      templateUrl: '/app/customers/tmpCreateCustomer.html',
      controller: 'CustomerCtrl'
    })

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
    return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage.token) {

           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/login');
           }
           return $q.reject(response);
       }
   };
  }]);
});