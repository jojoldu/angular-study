/**
 * Created by jojoldu@gmail.com on 2015-12-06.
 */
angular.module('book')
    .constant('productListActiveClass', 'btn-success')
    .controller('bookListCtrl', function($scope, $filter, productListActiveClass){
        var selectedGrade = 0;

        $scope.selectGrade = function(grade){
            selectedGrade = grade;
        };

        $scope.gradeFilterFn = function(book){
            return selectedGrade == 0 || (book.grade >= selectedGrade && book.grade < selectedGrade+1);
        };

        $scope.getGradeClass = function(grade){
            return selectedGrade == grade? productListActiveClass : '';
        };
    });