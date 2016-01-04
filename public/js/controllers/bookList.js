/**
 * Created by jojoldu@gmail.com on 2015-12-06.
 */
angular.module('book')
    .constant('bookListActiveClass', 'btn-success')
    .constant('bookListPageCount', 2)
    .controller('bookListCtrl', function($scope, $filter, bookListActiveClass, bookListPageCount){
        var selectedGrade = 0;

        $scope.selectedPage = 1;
        $scope.pageSize = bookListPageCount;

        $scope.selectGrade = function(grade){
            selectedGrade = grade;
            $scope.selectedPage = 1;
        };

        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        };

        $scope.gradeFilterFn = function(book){
            return selectedGrade == 0 || (book.grade >= selectedGrade && book.grade < selectedGrade+1);
        };

        $scope.getGradeClass = function(grade){
            return selectedGrade == grade? bookListActiveClass : '';
        };

        $scope.getPageClass = function(page){
            return $scope.selectedPage == page? bookListActiveClass : '';
        };

        $scope.show = function(book){
            var msg = '';

            for(prop in book){
                if(prop != '$$hashKey'){
                    msg += prop + ' : ' + book[prop] + '\n';
                }
            }

            alert(msg);
        }
    });