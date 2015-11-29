/**
 * Created by user on 2015-11-22.
 */

angular.module('product',['customFilter', 'cart', 'ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('checkout', {
            templateUrl : '/html/cart/checkoutSummary.html'
        });

        $routeProvider.when('products', {
            templateUrl : '/html/productList.html'
        });

        $routeProvider.otherwise({
            templateUrl: '/html/productList.html'
        });
    })
    .constant('url', 'http://localhost:8080/product')
    .controller('productCtrl', function($scope, $http, url){
       $scope.data={};

        $http.get(url)
            .success(function(data){
                $scope.data.products = data;
            })
            .error(function(error){
               $scope.data.error = error;
            });

});