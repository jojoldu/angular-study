/**
 * Created by jojoldu@gmail.com on 2015-12-06.
 */

angular.module('customFilter')
    .filter('grade', function(){
        return function(data){
            if(angular.isArray(data)){
                var results = [];
                var grades = {};

                for(var i=0;i<data.length;i++){
                    var grade = parseInt(data[i].grade);
                    if(angular.isUndefined(grades[grade])){
                        grades[grade] = true;
                        results.push(grade);
                    }
                }
                return results;
            }else{
                return data;
            }
        }
    })
    .filter('range', function($filter){
       return function(data, page, size){
           if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
                var startIndex = (page - 1) * size;
               if(data.length < startIndex){
                   return [];
               }else{
                   return $filter('limitTo')(data.splice(startIndex), size);
               }
           }else{
               return data;
           }
       }
    })
    .filter('pageCount', function(){
       return function (data, size){
           if(angular.isArray(data)){
               var result = [];
               for(var i=0; i<Math.ceil(data.length/size); i++){
                   result.push(i);
               }
               return result;
           }else{
               return data;
           }
       }
    });