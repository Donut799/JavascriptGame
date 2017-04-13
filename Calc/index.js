"use strict"
function Calc(){

}
Calc.prototype.PI = Math.PI;
Calc.prototype.anglizer = function(angle){
	angle = angle%360;
	if(angle < 0){angle = 360 + angle}
	return angle;
}
Calc.prototype.mod = function(number,modulus){
	var temp = number % modulus;
	if(temp >= 0){return temp}
	else{return this.absValue(modulus) - this.absValue(temp)}
}
Calc.prototype.absValue = function(value){
	if(value >= 0){return value}
	else{return -value}
}
Calc.prototype.angDiff = function(first,second){
	first = this.anglizer(first);
	second = this.anglizer(second);
	var diff = this.absValue(first - second);
	if(diff < 180){return diff}
	else{return 360 - diff}
}
exports.Calc = Calc;