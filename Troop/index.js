"use strict"
console.log = console.log;//to be reassigned later
var Calc = require("../calc/index.js").Calc;
var Calc = new Calc();
var Position = require("../position/index.js").Position;
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};
function Troop(isGround, typeName, PUAPDO, AIString, defense, attack, ID, weapon, game, health, userName, logger, chat) {
	this.game = game;
	this.logger = logger;
	this.chat = chat;
	this.isGround = isGround;
	this.ai = this.assignAI(AIString);
	this.shieldDirection;
	this.attack = attack;
	this.id = ID;
	this.weapon = weapon;
	this.weapon.owner = this;
	this.world = game.world;
	this.PUAPDO = PUAPDO;
	this.actionPoints = 0;//TODO might change this.
	this.safeLog = function(string){
		if(typeof string === "string"){
			this.logger.log(string);
		}else{
			throw new Error("Error. safeLog was not given a string as a parameter");
		}
	}.bind(this);
	this.safeChat = function(message,person){
		if(typeof person === "string" && game.players[person]){
			if(typeof message === "string"){
				this.game.players[person].chat.log(message);
			}else{
				throw new Error("Error. safeChat was not given a String as the first parameters");
			}
		}else{
			throw new Error("Error. safeChat was not given a String for the second parameter, or that person does not exist");
		}
	}.bind(this);
	this.safeMove = function(xTranslation, yTranslation){
		if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)) {
			var position = this.World.troopPosition(this.id);
			if((position.x + xTranslation >= 0 && position.x + xTranslation < World.map.xLength) && (position.y + yTranslation >= 0 && position.y + yTranslation < World.map.yLength)){
				this.move(xTranslation, yTranslation);
			}else{
				throw new Error("Error. safeMove was not given values in the correct range.");
			}
		} else {
			throw new Error("Error. safeMove was not given integers as parameters");
		}
	}.bind(this);
	this.safeMoveTo = function(xPosition,yPosition){
		if (Number.isInteger(xPosition) && Number.isInteger(yPosition)) {
			if((xPosition >= 0 && xPosition < World.xLength) && (yPosition >= 0 && yPosition < World.map.yLength)){
				this.moveTo(xPosition,yPosition);
			}else{
				throw new Error("Error. safeMoveTo was not given values in the correct range.");
			}
		}else{
			throw new Error("Error. safeMoveTo was not given integers as parameters");
		}
	}.bind(this);
	this.safeAttackAt = function(xAttack,yAttack){
		if (Number.isInteger(xAttack) && Number.isInteger(yAttack)) {
			if((xAttack >= 0 && xAttack < this.World.xLength) && (yAttack >= 0 && yAttack < this.World.map.yLength)){
				this.AttackAt();
			}else{
				throw new Error("Error. safeAttack was not given values in the correct range.");
			}
		}else{
			throw new Error("Error. safeAttackAt was not given integers as parameters");
		}
	}.bind(this);
	this.safeAttack = function(angleOfAttack){
		if(true/*(angleOfAttack) && (typeof angleOfAttack === "number")*/){
			this.attack(Calc.anglizer(angleOfAttack));
		}else{
			throw new Error("Error. safeAttack was not given a number as a parameter");
		}
	}.bind(this);
	this.safeDefend = function(isActive, direction){
		if(typeof isActive === "boolean" && (!direction || typeof direction === "number")){
			this.defend(isActive, Calc.anglizer(direction));
		}else{
			throw new Error("Error. safeDefend was not given a ");
		}
	}.bind(this);
	this.safeCoordIsValid = function(xCoord, yCoord){
		if(typeof xCoord === "number" && typeof yCoord === "number"){
			return this.coordIsValid(xCoord,yCoord);
		}
	}.bind(this);
	
}
//NOTE: the world will be asked to do the attacking, moving, and manage things like this
//TODO Figure out all necessary actions.
Troop.prototype.move = function(xTranslation,yTranslation){
	this.world.move(this.id,xTranslation,yTranslation);
}
Troop.prototype.assignAI = function(AIString){
	try{
		return new Function("troopClone,worldClone,log,chat,PUAPDO,move,moveTo,attack,defend,coordIsValid,actionExceedsLimit,input",AIString);
	}catch(err){//TODO
		this.logger.log("Error. assignAI could not create the function from the string provided.");
		return function(){}//so nothing breaks;
	}
}
Troop.prototype.moveTo = function(xPosition,yPosition){
	this.world.moveTo(this.id,xPosition,yPosition);
}
Troop.prototype.defend = function(isActive, direction){//direction is int 0-359
	if(isActive){this.shieldDirection = Calc.anglizer(direction);}
	else{this.shieldDirection = null;}
}
Troop.prototype.attack = function(direction){//direction is int 0-359
	this.world.attack(this.id,direction,this.weapon);
}
Troop.prototype.attackAt = function(xAttack,yAttack){
	this.world.attackAt(this.id,xAttack,yAttack,this.weapon);
}
Troop.prototype.takeTurn = function(userInput) {
	var blank = {};
	blank.ai = this.ai;//Make sure "this" points to a blank object, and not a useful one.
	blank.ai(this.clone(),this.world.clone(),this.safeLog,this.safeChat,this.PUAPDO,this.safeMove,this.safeMoveTo,this.safeAttack,this.safeAttackAt,this.safeDefend,this.safeCoordIsValid,this.safeActionExceedsLimit,userInput);
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
Troop.prototype.coordIsValid = function(xCoordinate,yCoordinate){
	if(xCoordinate > 0 && yCoordinate > 0){
		if(xCoordinate < this.world.map.xLength && yCoordinate < this.world.map.yLength){
			return true;
		}
	}
	return false;
}
Troop.prototype.actionExceedsLimit = function(action){
	//Need to determine action "prices"
}
Troop.prototype.toString = function(){
	return this.typeName + " is at " + this.x + "," + this.y//+ this.x + "," + this.y;
}
exports.Troop = Troop;