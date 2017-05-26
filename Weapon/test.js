"use strict"
Var Calc = require("calc").Calc;
function Weapon(damage,range,maxDeviation,deviationChance,critChance){
	this.damage = damage;
	this.range = range;
	this.maxDeviation = maxDeviation;
	this.deviationChance = deviationChance;
	this.owner = null;
	if(critChance){this.critChance = critChance;}
	else{this.critChance = 0;}
}
Weapon.prototype.damageDealt = function(critChance){//if there is a critChance specified use that instead.
	if(!critChance){critChance = this.critChance;}
	if(Math.random() * 100 < critChance){return this.damage * 2;}
	else{return this.damage;}
}
Weapon.prototype.deviate = function(angle){
	if(Math.random() * 100 < this.deviationChance){
		var tempMaxDeviation = this.maxDeviation
		//if the attack occurs in the same direction as the shield deviation should increase by 2x the proportion of the angle of the attack to the angle of the shield.
		if(this.owner.shieldDirection){
			var angDiff = this.Calc.angDiff(this.angle,this.owner.shieldDirection)
			if(angDiff < 90){
				tempMaxDeviation = tempMaxDeviation * (((90 - angDiff) / 90) + 1)
			}
		}
		angle = Calc.anglizer(angle + (tempMaxDeviation * 2 * (Math.random() - .5)));
	}
	return angle;
}
Weapon.prototype.clone = function(){
	//TODO
	return this;
}

exports.Weapon = Weapon;