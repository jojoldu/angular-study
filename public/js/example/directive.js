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
    })
    .directive('products', function(){
        return {
            restrict:'E',
            link:function(scope, element, attrs){
                var products = [
                    {category : 'Watersports', description:'1인용 보트', name:'카약', price:'270000', id:1},
                    {category : 'Watersports', description:'보호 장비', name:'보호재킷', price:'48000', id:2},
                    {category : 'Soccer', description:'FIFA 규격의 무게', name:'축구공', price:'28000', id:3},
                    {category : 'Soccer', description:'Nike', name:'축구화', price:'160000', id:4},
                    {category : 'Soccer', description:'상,하의', name:'유니폼', price:'97000', id:5},
                    {category : 'BasketBall', description:'KBL 공식 지정구', name:'농구공', price:'56000', id:6},
                    {category : 'BasketBall', description:'2015 서울 StreetBall', name:'대회참가권', price:'20000', id:7},
                    {category : 'BasketBall', description:'조던 6', name:'농구화', price:'180000', id:8},
                    {category : 'BasketBall', description:'겨울용', name:'이너웨어', price:'46000', id:9}
                ];

                scope.products = products;
            },
            template:'<br><ul><li ng-repeat="product in products">{{product.name}}</li></ul>'
        }
    })
    .directive('templateList', function(){
       return {
           link : function(scope, element, attrs){

           },
           restrict: 'A',
           templateUrl: function(el, attrs){
               //바로 위 directive인 products에서 scope에 products 데이터를 넣어주므로 해당 데이터를 활용하자
               var defaultPath = '../../html/';
               var templateName = (attrs['template'] === 'table')?
                   'exampleTableTemplate.html' : 'exampleTemplate.html';
               return defaultPath+templateName;
           }
       }
    });
