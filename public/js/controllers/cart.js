/**
 * Created by jojoldu@gmail.com on 2015-11-28.
 */

angular.module('cart', [])
    .factory('cart', function(){
        var cartData = [];

        return {
            addProduct : function(id, name, price){
                var isExisting = false;

                for(var i=0; i<cartData.length;i++){
                    if(cartData[i].id === id){
                        cartData[i].count++;
                        isExisting = true;
                        break;
                    }
                }

                if(!isExisting){
                    cartData.push({count:1, id:id, price:price, name:name});
                }
            },
            removeProduct : function(id){
                for(var i=0;i<cartData.length;i++){
                    if(cartData[i].id === id){
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProducts : function(){
                return cartData;
            }
        }
    })
    .directive('cartSummary', function(cart){
        return {
            restrict : 'E',
            templateUrl : ''
        }
    });
