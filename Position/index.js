"use strict"
//this will be used to store positions of anything.
function Position(xPosition, yPosition) {
  this.x = xPosition;
  this.y = yPosition;
}
Position.prototype.clone = function() {
  //return new Position(this.x, this.y) //TODO
}
Position.prototype.move = function(xTranslation, yTranslation) {
  this.x += xTranslation;
  this.y += yTranslation;
}
Position.prototype.moveTo = function(xPosition, yPosition) {
  this.x = xPosition;
  this.y = yPosition;
}
Position.prototype.toString = function() {
  return this.x + "," + this.y;
}

exports.Position = Position;
