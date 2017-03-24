"use strict"
console.log = console.log;//to be reassigned later
var Position = require("position").Position;
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function Troop(isGround, typeName, AI, defense, attack, ID, weapon, world, health, userName) {//PUAPDO
	this.isGround = isGround;
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
//TODO Figure out all necessary actions.
Troop.prototype.defend = function(isActive, direction){//direction is int 1-360
	if(isActive){this.shieldDirection = direction;}
	else{this.shieldDirection = null;}
}
Troop.prototype.attack = function(direction){//direction is int 1-360
	this.world.attack(this.id,direction,weapon);
}
Troop.prototype.attackAt = function(position){
	this.world.attackAt(this.id,position,weapon);
}
Troop.prototype.safeMove = function(xTranslation, yTranslation){
	if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)) {
		this.move(xTranslation, yTranslation)
	} else {
		throw new Error("Error. safeMove was not given integers as parameters");
	}
}
Troop.prototype.takeTurn = function(userInput) {
	var blank = {};
	blank.ai = this.ai;//Make sure "this" points to a blank object, and not a useful one.
	//TODO WORK ON FUNCTION CONSTRUCTOR FIRST!!!
	//blank.ai(this.clone(),)
    //TODO
}
Troop.prototype.clone = function(world){//World is not required used if you don't want it to clone the world (avoid circular references)
  var clonedTroop = new Troop()
  clonedTroop.typeName = this.typeName;
  clonedTroop.ai = this.ai;
  clonedTroop.position = (this.position.clone || function(value) {
    return value
  })(this.position);//just in case i decide to remove position cloning, or haven't made it yet etc.
  //TODO
}
Troop.prototype.toString = function(){
	return this.typeName + " is at " + this.x + "," + this.y//+ this.x + "," + this.y;
}
exports.Troop = Troop;