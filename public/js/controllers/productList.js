/**
 * Created by user on 2015-11-22.
 */
angular.module('product')
    .constant('productListActiveClass', 'btn-primary')
    .constant('productListPageCount', 3)
    .controller('productListCtrl', function($scope, $filter, $http, $q, productListActiveClass, productListPageCount){
        var selectedCategory = null;
        $scope.totalPrice = 0;
        $scope.carts = [];
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectCategory = function(newCategory){
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };

        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        };

        $scope.categoryFilterFn = function(product){
            return selectedCategory == null || product.category == selectedCategory;
        };

        $scope.getCategoryClass = function(category){
            return (selectedCategory == category)? productListActiveClass : '';
        };

        $scope.getPageClass = function(page){
            return ($scope.selectedPage == page)? productListActiveClass : '';
        };

        $scope.addCart = function(product){
            $scope.carts.push(product);
            $scope.totalPrice += parseInt(product.price);
        };

        $scope.buy = function(){
            var data = {
                list : $scope.carts,
                secretKey : 0
            };

            $http.get('/product/secret')
                .then(function(response){
                    return response.data;

                }).then(function(secretKey){
                    data.secretKey = secretKey;
                    $http.post('/product/buy', data)
                        .then(function(response){
                                alert(response.data);
                            },
                            function(response){
                                alert('구매 실패!' + response.status);
                            });
            });
        };


    });