 angular.module('ecomApp')
  .controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'cartFactory', 'Auth',
       function ($rootScope, $scope, $location, $localStorage, cartFactory, Auth) {
           function successAuth(res) {
               console.log(res);
               $localStorage.token = res.token;
               if ( res.admin === true ){
                 $localStorage.mfc_id = res.mfc_id;
                 $localStorage.user = res.user;
                 window.location = "/#/admin";
               } else {
                 cartFactory.setLocalCart(res.cart[0]);
                 $localStorage.user = res.user;
                 window.location = "/";
               }
           }

           $scope.signin = function () {
               var formData = {
                   username: $scope.username,
                   password: $scope.password
               };

               Auth.signin(formData, successAuth, function () {
                   $rootScope.error = 'Invalid credentials.';
               });
           };

           $scope.signup = function () {
               var formData = {
                   username: $scope.username,
                   password: $scope.password
               };

               Auth.signup(formData, successAuth, function () {
                   $rootScope.error = 'Failed to signup';
               })
           };

           $scope.logout = function () {
               Auth.logout(function () {
                   window.location = "/"
               });
           };
           $scope.user_id = $localStorage.user;
           $scope.token = $localStorage.token;
           $scope.tokenClaims = Auth.getTokenClaims();
       }])