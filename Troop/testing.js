"use strict"
function Position(xPosition, yPosition) {
	this.x = xPosition;
	this.y = yPosition;
	this.safeMove = function(xTranslation,yTranslation){
		if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)){
			this.move(xTranslation,yTranslation);
		}
		else{
			throw new Error("safe mode was not given integers");
		}
	}.bind(this);
}
Position.prototype.clone = function() {
	return new Position(this.x, this.y)
}
Position.prototype.move = function(xTranslation, yTranslation) {
	this.x += xTranslation;
	this.y += yTranslation;
}
Position.prototype.safeMove = function(xTranslation,yTranslation){
	if (Number.isInteger(xTranslation) && Number.isInteger(yTranslation)){
		this.move(xTranslation,yTranslation);
	}
	else{
		throw new Error("safe mode was not given integers");
	}
}.bind(this);//bind this, so that when it is passed to a function this will still refer to the correct variable
Position.prototype.moveTo = function(xPosition, yPosition) {
	this.x = xPosition;
	this.y = yPosition;
}
Position.prototype.toString = function() {
	return this.x + ":" + this.y;
}

var a = new Position(3,6);
console.log(a.toString())
var b = new Function("safeMove","{safeMove(5,1);}")
b(a.safeMove);
console.log(a.toString())
