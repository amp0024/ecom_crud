 angular.module('ecomApp')
  .controller('ProductCtrl', ['$scope', '$http', '$routeParams', 'productFactory', '$localStorage', function($scope, $http, $routeParams, productFactory, $localStorage){

    if (!$localStorage.token){
      $localStorage.$reset();
    }
    $scope.ordered = $localStorage.setOrdered;

    $scope.deleteOrderPopup = function(){
      $localStorage.setOrdered = false;
      $scope.ordered = false;
    }

    $scope.goToOrders = function(){
      $localStorage.setOrdered = false;
      $scope.ordered = false;
      window.location = '/#/orders';
    }

    function getProducts(){
      productFactory.getProducts()
        .success(function(data) {
          $scope.products = data;
        }).error(function(error) {
          $scope.status = 'Unable to load book data: ' + error.message;
        });
      }
    getProducts();

    $scope.createProduct = function(){
      var product = $scope.product;
      product.mfc_id = $localStorage.mfc_id;
      productFactory.addProduct(product)
        .success(function(data){
          alert('Pause!');
          window.location ='/#/admin';
        }).error(function(error){
          $scope.status = error.message;
        });
    };

    $scope.fileNameChanged = function(ele){
       $scope.product = {};
       var files = "https://s3-us-west-2.amazonaws.com/ecom-app/"+ele.files[0].name;
       $scope.product.img_url = files;
      };
  }])
  .controller('SingleProductCtrl', ['$scope', '$localStorage', '$http', '$routeParams', 'productFactory', 'cartFactory', 'Flash', function($scope, $localStorage, $http, $routeParams, productFactory, cartFactory, Flash){

    var product_id = $routeParams.product_id;
    function getProduct(product_id){
      productFactory.getProduct(product_id)
        .success(function(data) {
          console.log(data);
          getMfcProducts(data[0].mfc_id);
          $scope.products = data;

        }).error(function(error) {
          $scope.status = 'Unable to load product data: ' + error.message;
        });
      }
    getProduct(product_id);

    function getMfcProducts(mfc_id){
      productFactory.getProductByMfc(mfc_id)
        .success(function(data){
          $scope.mfcImg = data[0].logo_url;
          $scope.mfcProducts = data;
        }).error(function(error){
          $scope.status = 'Unable to load mfcProduct data: ' + error.message;
        });
    }


    $scope.updateProduct = function(){
      var product = $scope.products[0];
      console.log(product);
      productFactory.updateProduct(product)
        .success(function(data){
          window.location='/#/admin';
        })
        .error(function(error){
          $scope.status = error.message;
        });
    };

    $scope.addToCart = function(){
      var cart = cartFactory.getLocalCart();
      var product_id = $routeParams.product_id;
      if (!$localStorage.token){
        var message = 'Please login to create an order.';
        var id = Flash.create('warning', message);
        window.location = '/#/login';
      }
      productFactory.addToCart(product_id, cart)
        .success(function(data){
          window.location ='/';
        }).error(function(error){
          $scope.status = error.message;
        });
    };
  }])
  .controller('folderCtrl', function ($scope, $http) {
  $scope.w = window.outerWidth;
  $scope.h = window.innerHeight-20;
  $scope.uri = "http://lorempixel.com";
  $scope.folders = [
    'abstract',
    'animals',
    'business',
    'cats',
    'city',
    'food',
    'night',
    'life',
    'fashion',
    'people',
    'nature',
    'sports'
  ];
  $scope.getMfcImages = function(mfc_id){
    //Math.rand manufacturer
    $scope.products.map(function(product){
      if (product.mfc_id === mfc_id){
        return product.img_url;
      }
    });
  };
  $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //Below would be scopeCurrentImg
  $scope.currentFolder = $scope.folders[0];
  $scope.selectFolder = function (folder) {
    console.log("Select Folder Called! ", folder);
    //$scope.img_url
    $scope.currentFolder = folder;
  };
  //$scope.img_url for below
  $scope.activeFolder = function (folder) {
    return (folder === $scope.currentFolder) ? 'active' : '';
  };
});
