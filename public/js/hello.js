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
    });