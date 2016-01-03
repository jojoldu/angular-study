/**
 * Created by user on 2015-11-22.
 */

angular.module('product',['customFilter'])
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