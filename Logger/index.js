function Logger(){
	this.viewedIndex = -1;//the index of the last log message viewed
	this.textArray = [];//stores the logged messages
}
Logger.prototype.log = function(string){
	if(string != null){
		
		this.textArray[this.textArray.length] = string.toString();//if the "string" object isn't a string it will be turned into one.
	}
}
Logger.prototype.messages = function(startIndex){//returns all of the messages starting at the "startIndex"
	var toString = "";
	if(!startIndex){startIndex = 0;}//make sure the startIndex is not null
	for(var i = startIndex; i < this.textArray.length; i++){
		toString += this.textArray[i];
		if(!(i === this.textArray.length - 1)){toString += "\n";}
	}
	return toString;
}
Logger.prototype.newMessages = function(){
	var returnString = this.messages(this.viewedIndex + 1);
	this.viewedIndex = this.textArray.length - 1;//we have now viewed more messages, so update the index
	return returnString;
}
Logger.prototype.hasNew = function(){
	return (textArray.length > (viewedIndex + 1))
}
exports.Logger = Logger();