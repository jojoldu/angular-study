/**
 * Created by jojoldu@zuminternet.com on 2016-01-29.
 */

angular.module('example')
    .directive('ngInitFocus', function(){
        return {
            link : function(scope, element){
                element[0].focus();
            }
        }
    })
    .directive('helloWorld', function(){
        return {
            restrict : 'E', // E:element, A:attribute, C:class, M:comment
            template : '<div><h3>헬로우 월드</h3></div>'
        }
    });