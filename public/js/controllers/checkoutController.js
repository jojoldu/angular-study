/**
 * Created by jojoldu@gmail.com on 2015-11-30.
 */
angular.module('product')
.controller('cartSummaryController', function($scope, cart){
    $scope.cartData = cart.getProducts();

    $scope.total = function(){
        var total = 0;
        for(var i=0;i<$scope.cartData.length;i++){
            total += $scope.cartData[i].price * $scope.cartData[i].count;
        }
        return total;
    }

    $scope.remove = function(id){
        cart.removeProduct(id);
    }
});