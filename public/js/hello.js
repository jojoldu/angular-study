/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('hello', [])
    .controller('HelloController', function($scope, $filter){
        $scope.hello = {
            msg : 'hello.'
        }

        $scope.toUpper = function(){
            $scope.hello.msg = $filter('uppercase')($scope.hello.msg);
        }

        $scope.items = [
            {
                title : '볼펜',
                count : 4,
                price : 1800
            },
            {
                title : '지우개',
                count : 1,
                price : 800
            },
            {
                title : '연필',
                count : 12,
                price : 400
            }
        ];


        $scope.remove = function(index){
            $scope.items.splice(index, 1);
        }

        $scope.add = function(){
            var item = {
                title : $scope.title,
                count : $scope.count,
                price : $scope.price
            }
            $scope.items.push(item);
            $scope.refresh();
        }

        $scope.refresh = function(){
            $scope.title = '';
            $scope.count = 0;
            $scope.price = 0;
        }

        $scope.bill = {
            totalPrice : 0,
            discountPrice : 0,
            payPrice : 0
        };

        $scope.total = function(){
            var totalPrice = 0;
            angular.forEach($scope.items, function(item){
                totalPrice += item.count * item.price;
            });
            $scope.bill.totalPrice = totalPrice;
            $scope.bill.discountPrice = (totalPrice > 20000)? totalPrice/10 : 0;
            $scope.bill.payPrice = totalPrice - $scope.bill.discountPrice;

            return totalPrice;
        }
    });