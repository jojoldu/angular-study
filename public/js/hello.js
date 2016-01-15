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

        //어떻게하면 순차적으로 실행하여 정상적인 registNumber를 생성할수있을까?
        $scope.born = function(){
            var name, gender, registNumber;

            var promiseName = $http.get('/name')
                .then(function(response){
                    name = response.data;
                    console.log('name : ' + name);
                });

            var promiseGender = $http.get('/gender/'+name)
                .then(function(response){
                    gender = response.data;
                    console.log('gender : ' + gender);
                });

            var promiseRegist = $http.get('/regist/'+gender)
                .then(function(response){
                    registNumber= response.data;
                    console.log('registNumber : ' + registNumber);
                });

            $q.all([promiseName, promiseGender, promiseRegist])
                .then(function(){
                    alert(registNumber);
                });
        }
    });