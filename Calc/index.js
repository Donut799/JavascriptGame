"use strict"
function Calc(){

}
Calc.prototype.PI = Math.PI;
Calc.prototype.anglizer = function(angle){
	angle = angle%360;
	if(angle < 0){angle = 360 + angle}
	return angle;
}


exports.Calc = Calc;