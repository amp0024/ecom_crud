'use strict';

/* The main app with route configurations */

angular.module('ecomApp', ['ngRoute', 'ngStorage', 'angular-loading-bar'])
.config(function($routeProvider, $httpProvider){
    $routeProvider

    /* LANDING PAGE */
    .when('/', {
        templateUrl: '/app/views/home.html',
        css: '/styles/css/main.css',
        controller: 'productCtrl'
    })
    .when('/products/:product_id', {
        templateUrl: '/app/views/productView.html',
        css: '/styles/css/main.css',
        controller: 'singleProductCtrl'
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
    .when('/admin', {
      templateUrl: '/app/views/admindashboard.html'
    })
    .otherwise('/');

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
   return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage.token) {
               config.headers['x-access-token'] = $localStorage.token;
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