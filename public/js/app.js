/**
 * Created by user on 2015-11-20.
 */

var app = angular.module('app', []);

app.controller('MainController', function($scope){
    $scope.show = function(){
        alert($scope.user.name);
    }
});