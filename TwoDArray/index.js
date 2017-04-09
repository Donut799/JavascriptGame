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
TwoDArray.prototype.clone = function() {//maybe create ability to have exclusions. . .
  /*var cloned = new TwoDArray(this.xLength, this.yLength)
  for (var x = 0; x < this.xLength; x++) {
    for (var y = 0; y < this.yLength; y++) {
      cloned[x][y] = (this[x][y].clone || function(value) {
        return value
      })(this[x][y]);
    }
  }
  return cloned */ //TODO
  return this;
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

exports.TwoDArray = TwoDArray;