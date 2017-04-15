"use strict"
var Position = require("..\Position\index.js").Position;
function World(width, height) {
  this.map = new TwoDArray(width, height);
  this.troops = [];
  this.positions = [];
}
World.prototype.toString = function() {
  return map.toString();
}
World.prototype.findTroop = function(troopID){
	return this.troops[troopID];
}
World.prototype.troopPosition = function(troopID){
	return this.positions[troopID];
}
World.prototype.addTroop = function(Troop,xCoordinate,yCoordinate){
	if(xCoordinate == undefined || yCoordinate == undefined){throw new Error("Error. addTroop was not given two coordinates");}
	if(this.map[xCoordinate][yCoordinate]){
		throw new Error("Error. addTroop was given an already used coordinate");
	}else{
		this.map[xCoordinate][yCoordinate] = Troop;
	}
	this.troops[Troop.id] = Troop;//add the troop with the key of its id
	this.positions[Troop.id] = new Position(xCoordinate,yCoordinate);//keep track of the troops position accessed using the id of the troop
}
World.prototype.removeTroop = function(troopID){
	var position = this.positions[troopID];
	var x = position.x;
	var y = position.y;
	this.map[x][y] = null;
	try{
	}catch{throw new Error("Error. removeTroop may not have been given a valid troopID");}
	delete this.troops[troopID];
	delete this.positions[troopID];
}
World.prototype.move = function(id,xTranslation,yTranslation){
	var currentPosition = this.positions[id];
	if(this.map[currentPosition.x + xTranslation][currentPosition.y + yTranslation] != null){throw new Error("Error. move function was told to move object to invalid location");}
	this.positions[id].move(xTranslation,yTranslation);
	this.map[currentPosition.x + xTranslation][currentPosition.y + yTranslation] = this.map[currentPosition.x][currentPosition.y];
	this.map[currentPosition.x][currentPosition.y] = null;
}
World.prototype.moveTo = function(id,x,y){
	if(this.map[x][y] != null){"Error. moveTo function was told to move object to invalid location";}
	this.positions[id].moveTo(x,y);
	var position = this.positions[id];
	this.map[x][y] = this.map[position.x][position.y];
	this.map[position.x][position.y] = null;
}
World.prototype.clone = function(Troop) {
  /*var tempWorld = new World(this.map.xLength, this.map.yLength);
  tempWorld.map = this.map.clone();
  return tempWorld;*/ //TODO
  return this;
}

exports.World = World;