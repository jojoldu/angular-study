/**
 * Created by jojoldu@zuminternet.com on 2016-02-16.
 */
angular.module('example', ['ngRoute'])
.config(function($routeProvider){
   $routeProvider
       .when('/home', {templateUrl:'html/example/home.html'})
       .when('/products', {templateUrl:'html/example/products.html'})
       .otherwise({redirectTo:'/home'});
});