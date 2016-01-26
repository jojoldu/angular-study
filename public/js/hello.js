/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('hello', [])
    .controller('HelloController', function($scope, $filter, $http, $q, $timeout){
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
        $scope.showCook = function(){
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
        };

        $scope.threeSecond = function(){
            $timeout(function(){
                alert('헬로우');
            },3000)
                .then(function(){
                    alert('월드') ;
                });
        };
        //$scope.threeSecond();

        $scope.result=false;
        $scope.showQuiz = function(){
            $scope.result=true;
            var promiseObj = $timeout(function(){
                return $scope.answer;
            }, 3000);

            promiseObj.then(function(input){
                if(input == 39){
                    $scope.result=true;
                    $scope.msg="정답!";
                }else{
                    $scope.result=false;
                    $scope.msg="틀렸어요!";
                }
                $scope.info = "다시 시작하려면 refresh 해주세요.";
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
        };

        $scope.promiseTest = function(number){
            if(number<1){
                asyncA();
                asyncB();
            }else if(number==1){
                var a = asyncA();
                var b = asyncB();
                
                $q.all([a, b])
                    .then(function(){
                        alert('다했다!');
                    });
            }else{
                var defer = $q.defer();
                defer.promise
                    .then(function(){
                        return $timeout(function(){
                            alert('asyncA');
                        }, 3000);
                    })
                    .then(function(){
                        return $timeout(function(){
                            alert('asyncB');
                        }, 1000);
                    });

                defer.resolve();
            }
        };

        //$scope.promiseTest(2);

        function asyncA(){
            console.log("A시작");
            return $timeout(function(){
                console.log('asyncA');
            }, 3000);
        }

        function asyncB(){
            console.log("B시작");
            return $timeout(function(){
                console.log('asyncB');
            }, 1000);
        }

        function asyncC(){
            console.log("C시작");
            return $timeout(function(){
                console.log('asyncC');
            }, 2000);
        }

        /*
            promise 퀴즈
            - 아래의 3가지 조건에 맞춰 promise 패턴을 적용
            1) asyncA 실행후 asyncB 실행
            2) 1)과 별도로 2초뒤 console.log 하는 asyncC 진행
            3) asyncA/B/C 가 다 끝나면 console.log('끝났다!!'); 실행
         */
        $scope.promiseQuiz = function(){
            var asyncAB = asyncA()
                    .then(asyncB);

            $q.all([asyncAB, asyncC()])
                .then(function(){
                    console.log('끝났다!!!');
                });
        };
        $scope.promiseQuiz();

    });