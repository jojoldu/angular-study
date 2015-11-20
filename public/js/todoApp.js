/**
 * Created by user on 2015-11-21.
 */
//해당 부분(model)은 서버에서 보내준 데이터라고 가정함
var model = {
    user: '동욱',
    items: [
        { action: '출근하기', done:'N' },
        { action: '스터디 예습', done:'Y' },
        { action: '도서 구매', done:'N' },
        { action: '데이트', done:'Y' }
    ]
};

var todoApp = angular.module('todoApp', []);
todoApp.controller("TodoController", function($scope){
    $scope.todo = model;
});