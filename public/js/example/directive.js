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
    })
    .directive('movie', function(){
        return {
            restrict:'E',
            link: function(scope, element, attrs){
                scope.username = attrs.username;
                scope.reputation = attrs.reputation;
                scope.img = attrs.img;
            },
            template:'<div><p><h3>영화소개</h3></p><p>Username: {{username}}</p> <p>Reputation: {{reputation}}</p> <img src="{{img}}" width="200" height="200"> </div>'
        }
    });
