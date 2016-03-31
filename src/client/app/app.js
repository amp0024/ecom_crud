'use strict';

/* The main app with route configurations */

angular.module('ecomApp', ['ngRoute'])
.config(function($routeProvider){
    console.log('config working?');
    $routeProvider

    /* LANDING PAGE */
    .when('/', {
        templateUrl: '/app/views/home.html',
        css: '/styles/css/main.css',
        controller: 'productCtrl'
    })
    .otherwise('/');
});