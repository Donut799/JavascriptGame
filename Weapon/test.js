"use strict"
Var Calc = require("calc").Calc;
function Weapon(damage,range,maxDeviation,deviationChance){
	this.damage = damage;
	this.range = range;
	this.maxDeviation = maxDeviation;
	this.deviationChance = deviationChance;
}
Weapon.prototype.deviate = function(angle){
	if(Math.random() * 100 < this.deviationChance){
		angle = Calc.anglizer(angle + (this.maxDeviation * 2 * (Math.random() - .5)));
	}
	return angle;
}
Weapon.prototype.clone = function(){
	//TODO
	return this;
}

exports.Weapon = Weapon;