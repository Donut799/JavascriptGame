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

function TwoDArray(xLength, yLength) {
  this.xLength = xLength;
  this.yLength = yLength;
  for (var i = 0; i < this.xLength; i++) {
    var y = [];
    y.length = this.yLength;
    for (var index = 0; index < y.length; index++) {
      y[index] = "";
    }
    this[i] = y;
  }
}
TwoDArray.prototype = []
TwoDArray.prototype.constructor = TwoDArray
TwoDArray.prototype.fill = function(fillObject) {
  for (var x = 0; x < this.xLength; x++) {
    for (var y = 0; y < this.yLength; y++) {
      //if the object supports it this will clone the object otherwise it will do a reference copy (irrelevant for primitives)
      this[x][y] = (fillObject.clone || function(value) {
        return value
      })(fillObject);
    }
  }
}
TwoDArray.prototype.clone = function() {
  var cloned = new TwoDArray(this.xLength, this.yLength)
  for (var x = 0; x < this.xLength; x++) {
    for (var y = 0; y < this.yLength; y++) {
      cloned[x][y] = (this[x][y].clone || function(value) {
        return value
      })(this[x][y]);
    }
  }
  return cloned
}
TwoDArray.prototype.toString = function() {
  var arrayAsString = "";
  for (var x = 0; x < this.xLength; x++) {
    for (var y = this.yLength; y < -1; y--) {
      arrayAsString += this[x][y].toString();
    }
    arrayAsString += "\n";
  }
  return arrayAsString;
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
