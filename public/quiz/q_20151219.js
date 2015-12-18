/**
 * Created by jojoldu@zuminternet.com on 2015-12-18.
 */

Array.prototype.getFirstAt = function(){
    return this[0];
}

Array.prototype.getMidAt = function(){
    return this.length >2? this[this.length/2] : this[0];
}

Array.prototype.getLastAt = function(){
    return this[this.length-1];
}