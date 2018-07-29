Array.prototype.toString = function(){
 return ''; 
}

var a = [1,2,3,4,5];
a.__proto__.__proto__.toString = function(){}

console.log(a);