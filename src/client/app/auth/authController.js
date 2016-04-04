 angular.module('ecomApp')
  .controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth',
       function ($rootScope, $scope, $location, $localStorage, Auth) {
           function successAuth(res) {
                console.log(res.token, "lajsdfkjsd");
                alert("ljasdfklj")
               $localStorage.token = res.token;
               console.log($localStorage.token);
               window.location = "/";
           }

           $scope.signin = function () {
               var formData = {
                   username: $scope.username,
                   password: $scope.password
               };

               Auth.signin(formData, successAuth, function () {
                   $rootScope.error = 'Invalid credentials.';
               })
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
           $scope.token = $localStorage.token;
           $scope.tokenClaims = Auth.getTokenClaims();
       }])