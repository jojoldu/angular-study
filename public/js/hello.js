/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('hello', [])
    .controller('HelloController', function($scope){
        $scope.hello = {
            msg : '안녕하세요.'
        }
    });