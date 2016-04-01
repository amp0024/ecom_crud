angular.module('ecomApp')
.factory('Auth', ['$http', '$localStorage', function ($http, $localStorage) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           signup: function (data, success, error) {
               $http.post('/auth/register', data).success(success).error(error);
           },
           signin: function (data, success, error) {
                // $localStorage.token = data.data.token;
                $http.post('/auth/login', data).then(function(data){
                  var req = {
                       method: 'POST',
                       url: '/api/safe/carts',
                       // headers: {
                       //   'x-access-token': data.data.token
                       // },
                       data: { token: data.data.token }
                      };
                      var pass = { token: data.data.token };
                  $http(req).success(success).error(error);
                });


           },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () {
               return tokenClaims;
           }
       };
   }
]);