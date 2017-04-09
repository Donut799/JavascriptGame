"use strict"
function World(width, height) {
  this.map = new TwoDArray(width, height);
  this.troops = [];
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
World.prototype.addTroop = function(){
	//TODO
}
World.prototype.clone = function(Troop) {
  /*var tempWorld = new World(this.map.xLength, this.map.yLength);
  tempWorld.map = this.map.clone();
  return tempWorld;*/ //TODO
  return this;
}

exports.World = World;