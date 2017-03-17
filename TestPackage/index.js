function Position(xPosition, yPosition) {
  this.x = xPosition;
  this.y = yPosition;
}
Position.prototype.clone = function() {
  return new Position(this.x, this.y)
}
Position.prototype.move = function(xTranslation, yTranslation, move_CallBack) {
  this.x += xTranslation;
  this.y += yTranslation;
  if (move_CallBack)
    move_CallBack();
}
Position.prototype.moveTo = function(xPosition, yPosition, moveTo_CallBack) {
  this.x = xPosition;
  this.y = yPosition;
  if (moveTo_CallBack)
    moveTo_CallBack();
}
Position.prototype.toString = function() {
  return this.x + ":" + this.y;
}




exports.position = Position;