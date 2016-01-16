/**
 * Created by jojoldu@gmail.com on 2015-12-11.
 */

angular.module('moneyBook', [])
    .controller('MoneyBookController', function($scope, $filter, $http){

        $scope.get = function(){
            $http.get('/money-book/history')
                .success(function(data){
                    $scope.histories = data;
                });
        };

        //Ajax promise then 추가 코드
        $scope.write = function(history){

            history.date = new Date().toLocaleString();

            $http.post('/money-book/history', history)
                .then(function(data){// 1.success function
                    if(data){
                        alert('데이터가 추가되었습니다.');
                        $scope.histories.push(history);
                        $scope.history = {};
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

        $scope.totalMoney = function(){
            var sum = 0,
                histories = $scope.histories;

            if(angular.isArray(histories)){
                for(var i=0;i<histories.length;i++){
                    sum += parseInt(histories[i].money);
                }
            }

            return sum;
        }

    });