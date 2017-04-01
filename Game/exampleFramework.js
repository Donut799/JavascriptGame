"Use Strict"
console.clear();
var lg = console.log;
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};



function Player(name, AIs, callbacks) {
  this.name = name;
  this.AIs = AIs;
  this.turnCount = 0;
  this.troops = [];
  this.callbacks = [];
}
Player.prototype.toString = function() {
  return this.name + " has " + this.troops.length + " troops, and has taken " + this.turnCount + " turns";
}
Player.prototype.addTroop = function(troop) {
  if ((troop === null || troop === undefined || !troop instanceof Troop)) {
    throw new Error("addTroop cannot take anything but \'Troop\' as a parameter");
  }
  if(this.callbacks[0])
  	troop.move_Callback = callbacks[0];//attach the callback
  this.troops.push(troop);
}
Player.prototype.takeTurn = function() {
  this.turnCount++;
  this.AIs[0]()
  for (var i = 0; i < this.troops.length; i++) {
    this.troops[i].takeTurn();
  }
}
Player.prototype.removeTroop = function(troop) {
    var index = this.player.troops.indexOf(troop)
    if (index > -1) {
      this.player.troops.splice(index, 1)
      return true;
    } else {
      return false
    }
}



function World(width, height) {
  this.map = new TwoDArray(width, height);
}
World.prototype.toString = function() {
  return map.toString();
}
World.prototype.clone = function() {
  var tempWorld = new World(this.map.xLength, this.map.yLength);
  tempWorld.map = this.map.clone();
  return tempWorld;
}


//function Troop(typeName, AI, position, ID) {
var troop = new Troop("archer", "blank", 2, 6, 2424631)
troop.safeMove("oops", 1)
lg(troop)

function Game(players, port, gameMode) {
	this.players = players;
	this.port = port;
	this.gameMode = gameMode || new GameMode();
	this.world = gameMode.initializeWorld();
}
Game.prototype.play = function() {

}

function GameMode(initializeFunction,onGameTickFunction,gameFinishedFunction){
	initializeWorld: initializeFunction || function(players){
		return new World(10,10);
	}
	onGameTick: onGameTickFunction || function(game){
	}
	gameFinished: gameFinishedFunction || function(game){
		return game.players[0];
	}
}
