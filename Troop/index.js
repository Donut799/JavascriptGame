"use strict"
console.log = console.log;//to be reassigned later
var Position = require("position").Position;
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function Troop(isGround, typeName,PUAPDO, AIString, defense, attack, ID, weapon, game, health, userName, logger, chat) {
	this.game = game;
	this.logger = logger;
	this.chat = chat;
	this.isGround = isGround;
	this.ai = new Function("troopClone,worldClone,log,chat,PUAPDO,move,moveTo,attack,defend,coordIsValid,actionExceedsLimit,input",AIString);
	this.typeName = typeName;
	this.health = health;//represents max health if i introduce healing
	this.healthLeft = health;//always starts at max
	this.defense = defense;
	this.shieldDirection;
	this.attack = attack;
	this.id = ID;
	this.weapon = weapon;
	this.world = game.world;
	this.PUAPDO = PUAPDO;
	this.safeLog = function(string){
		if(typeof string === "string"){
			this.logger.log(string);
		}else{
			throw new Error("Error. safeLog was not given a string as a parameter");
		}
	}.bind(this);
	this.safeChat = function(string,person){
		if(typeof person === "string" && game.players[person]){
			if(typeof string === "string"){
				this.game.players[person].chat.log(string);
			}else{
				throw new Error("Error. safeChat was not given a String as the first parameters");
			}
		}else{
			throw new Error("Error. safeChat was not given a String for the second parameter");
		}
	}.bind(this);
	Troop.prototype.safeMove = function(xTranslation, yTranslation){
		if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)) {
			this.move(xTranslation, yTranslation)
		} else {
			throw new Error("Error. safeMove was not given integers as parameters");
		}
	}.bind(this);
}
//NOTE: the world will be asked to do the attacking, moving, and manage things like this
//TODO Figure out all necessary actions.
Troop.prototype.move = function(xTranslation,yTranslation){
	this.world.move(this.id,xTranslation,yTranslation);
}
Troop.prototype.moveTo = function(xPosition,yPosition){
	this.world.moveTo(this.id,xPosition,yPosition);
}
Troop.prototype.defend = function(isActive, direction){//direction is int 0-359
	if(isActive){this.shieldDirection = direction%360;}
	else{this.shieldDirection = null;}
}
Troop.prototype.attack = function(direction){//direction is int 0-359
	this.world.attack(this.id,direction%360,weapon);
}
Troop.prototype.attackAt = function(position){
	this.world.attackAt(this.id,position,weapon);
}
Troop.prototype.takeTurn = function(userInput) {
	var blank = {};
	blank.ai = this.ai;//Make sure "this" points to a blank object, and not a useful one.
	blank.ai(this.clone(),this.world.clone(),this.safeLog,this.safeChat,this.PUAPDO,this.safeMove,this.safeMoveTo,this.safeAttack,this.safeDefend,Troop.prototype.coordIsValid,Troop.prototype.actionExceedsLimit,userInput);
}
Troop.prototype.clone = function(world){//World is not required used if you don't want it to clone the world (avoid circular references)
  //var clonedTroop = new Troop()
  //clonedTroop.typeName = this.typeName;
  //clonedTroop.ai = this.ai;
  //clonedTroop.position = (this.position.clone || function(value) {
  //  return value
  //})(this.position);//just in case i decide to remove position cloning, or haven't made it yet etc.
  //TODO
}
Troop.prototype.toString = function(){
	return this.typeName + " is at " + this.x + "," + this.y//+ this.x + "," + this.y;
}

exports.Troop = Troop;