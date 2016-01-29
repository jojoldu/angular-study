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
});