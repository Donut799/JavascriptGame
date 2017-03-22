"use strict"
console.log = console.log;//to be reassigned later
var Position = require("position").Position;
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function Troop(typeName, AI, defense, attack, ID, weapon, world, health) {//PUAPDO
	this.ai = AI;
	this.typeName = typeName;
	this.health = health;//represents max health if i introduce healing
	this.healthLeft = health;//always starts at max
	this.defense = defense;
	this.shieldDirection;
	this.attack = attack;
	this.id = ID;
	this.weapon = weapon;
	this.world = world;
}
//NOTE: the world will be asked to do the attacking, moving, and manage things like this
Troop.prototype.defend = function(isActive, direction){//direction is int 1-360
	if(isActive){this.shieldDirection = direction;}
	else{this.shieldDirection = null;}
}
Troop.prototype.attack = function(direction){
	this.world.attack(this.id,direction,weapon);
}
Troop.prototype.attackAt = function(position){
	this.world.attackAt(this.id,position,weapon);
}
Troop.prototype.safeMove = function(xTranslation, yTranslation){
	if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)) {
	//TODO check if move is valid
	this.move(xTranslation, yTranslation)
	if (move_Callback)
		this.move_Callback(xTranslation, yTranslation);
	} else {
		throw new Error("Error. safeMove was not given integers as parameters");
	}
}
Troop.prototype.takeTurn = function() {
	var blank = {};
	blank.ai = this.ai;//Make sure this points to a blank object,and not a useful one.
	blank.ai()
  //TODO
}
Troop.prototype.clone = function(){
  var clonedTroop = new Troop()
  clonedTroop.typeName = this.typeName;
  clonedTroop.ai = this.ai;
  clonedTroop.position = (this.position.clone || function(value) {
    return value
  })(this.position);
  clonedTroop.healthLeft = (this.healthLeft.clone || function(value) {
    return value
  })(this.healthLeft);
  clonedTroop.defenseStrength = (this.defenseStrength.clone || function(value) {
    return value
  })(this.defenseStrength);
  clonedTroop.attack = (this.attack.clone || function(value) {
    return value
  })(this.attack);
  clonedTroop.id = (this.id.clone || function(value) {
    return value
  })(this.id);
  //TODO
}
Troop.prototype.toString = function(){
	return this.typeName + " is at " + this.x + "," + this.y//+ this.x + "," + this.y;
}
exports.Troop = Troop;