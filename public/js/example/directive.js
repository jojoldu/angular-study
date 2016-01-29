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
            /*
             scope : 디렉티브가 적용된 뷰의 scope,
             element : 디렉티브가 적용된 html 엘리먼트,
             attrs : 디렉티브가 적용된 html 엘리먼트의 어트리뷰트
             */
            link: function(scope, element, attrs){
                scope.username = attrs.username;
                scope.reputation = attrs.reputation;
                scope.img = attrs.img;
            },
            template:'<div><p><h3>영화소개</h3></p><p>Username: {{username}}</p> <p>Reputation: {{reputation}}</p> <img src="{{img}}" width="200" height="200"> </div>'
        }
    })
    .directive('restricted', function(){
        return {
            restrict:'A',
            link: function(scope, element, attrs){
                var isAuth = Math.floor((Math.random() * 10) + 1) > 5;

                if(!isAuth){
                    element.css('display', 'none');
                }
            }
        }
    });
