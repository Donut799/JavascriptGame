"use strict"
console.log = console.log;//to be reassigned later
var Position = require("position").Position;
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function Troop(typeName, AI, xPosition, yPosition, ID, move_Callback) {
	this.x = xPosition;
	this.y = yPosition;
	this.ai = AI;
	this.typeName = typeName;
	this.healthLeft;
	this.attackStrength;
	this.defenseStrength;
	this.attack;
	this.id = ID;
	this.move_Callback = move_Callback;
}
Troop.prototype = new Position();
Troop.prototype.constructor = Troop;
Troop.prototype.attack = function( /*to be determined*/ ) {
  //TODO
}
Troop.prototype.safeMove = function(xTranslation, yTranslation) {
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
  //TODO
}
Troop.prototype.clone = function() {
  var clonedTroop = new Troop()
  clonedTroop.typeName = this.typeName;
  clonedTroop.AI = this.AI;
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