"use strict"
Var Calc = require("calc").Calc;
function Weapon(damage,range,maxDeviation,deviationChance){
	this.damage = damage;
	this.range = range;
	this.maxDeviation = maxDeviation;
	this.deviationChance = deviationChance;
	this.owner = null;
}
Weapon.prototype.deviate = function(angle){
	if(Math.random() * 100 < this.deviationChance){
		var tempMaxDeviation = this.maxDeviation
		//if the attack occurs in the same direction as the shield deviation should increase by 2x the proportion of the angle of the attack to the angle of the shield.
		if()
		
		
		angle = Calc.anglizer(angle + (this.maxDeviation * 2 * (Math.random() - .5)));
	}
	return angle;
}
Weapon.prototype.clone = function(){
	//TODO
	return this;
}

exports.Weapon = Weapon;