/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('hello', [])
    .controller('HelloController', function($scope, $filter, $http){
        $scope.hello = {
            msg : 'hello.'
        };

        $scope.toUpper = function(){
            $scope.hello.msg = $filter('uppercase')($scope.hello.msg);
        };

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
        };

        $scope.loadData = function(){
            $http.get('/hello/data')
                .success(function(data){
                    $scope.products = data;
                });
        };

        //Ajax post 추가 코드
        $scope.pushData = function(product){
          $http.post('/hello/data', product)
              .success(function(data){
                  if(data){
                      alert('데이터가 추가되었습니다.');
                      $scope.products.push( product);
                      $scope.product = {};
                  }else{
                      alert('데이터가 추가되지 못했습니다.');
                  }
              })
              .error(function(data, status, statusText){
                   alert(data+' ' +status +' ' + statusText);
              });
        };

    });