//Need to refactor all data services to the following:

angular
  .module('ecomApp')
  .factory('customerService', customerService)

customerService.$inject = ['$http'];

function customerService($http){
  var urlBase = '/api/safe/customers';

  var services = {
    getCustomer: getCustomer,
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
    cardOnFile: cardOnFile
  };

  function getCustomer(id){
    return $http.get(urlBase + '/profile/' + id)
  };

  function createCustomer(customer){
    console.log(customer)
    return $http.post(urlBase + '/profile', customer);
  };

  function updateCustomer(customer){
    return $http.post(urlBase + '/update/' + customer);
  };

  function cardOnFile(customer){
    return $http.get(urlBase + '/cardonfile/' + customer);
  }

  return services;
}