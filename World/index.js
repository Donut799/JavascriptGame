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
	//TODO
}
World.prototype.addTroop = function(Troop,xCoordinate,yCoordinate){
	if(this.map[xCoordinate][yCoordinate]){
		throw new Error("Error. addTroop was given an already used coordinate");
	}else{
		this.map[xCoordinate][yCoordinate] = Troop;
	}
	this.troops[Troop.id] = Troop;//add the troop with the key of its id
	this.positions[Troop.id] = new Position(xCoordinate,yCoordinate);//keep track of the troops position accessed using the id of the troop
}
World.prototype.removeTroop = function(troopID){
	
}
World.prototype.clone = function(Troop) {
  /*var tempWorld = new World(this.map.xLength, this.map.yLength);
  tempWorld.map = this.map.clone();
  return tempWorld;*/ //TODO
  return this;
}

exports.World = World;