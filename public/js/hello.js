/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('hello', [])
    .controller('HelloController', function($scope, $filter, $http, $q){
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
              .error(function(data, status){
                   alert(data+' ' +status);
              });
        };

        //Ajax promise then 추가 코드
        $scope.pushData2 = function(product){
            $http.post('/hello/data', product)
                .then(function(data){// 1.success function
                    if(data){
                        alert('데이터가 추가되었습니다.');
                        $scope.products.push( product);
                        $scope.product = {};
                    }else{
                        alert('데이터가 추가되지 못했습니다.');
                    }
                }, function(response){ // 2.error function
                    if(response.status === 500){
                        alert('서버에서 오류가 발생하였습니다..\n잠시후 시도해주세요.'); //혹은 다른 페이지로 이동
                    }else if(response.status === 404){
                        alert('Ajax 호출 url이 잘못되었습니다.');
                    }else{
                        alert('알수없는 오류 발생\n'+response.data);
                    }
                });
        };

        var defer = $q.defer();
        defer.promise
            .then(function(cook){
                alert('오늘의 요리는 ' + cook);
                return '제육볶음';
            })
            .then(function(cook){
                alert('와 ' + cook);
                return '멸치볶음';
            })
            .then(function(cook){
                alert('과 '+cook);
                return '콩나물 무침';
            });
        alert('뭐먹지?');
        defer.resolve('김치찌개');

    });