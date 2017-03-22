var express = require('express');
var app = express();
app.use(express.static('Mobirise'));
app.get("/",function(req, res){//main page
	console.log("main page requested")
	res.sendFile(__dirname + "/Mobirise/main.html");
})
app.get("/game",function(req, res){//page that displays the game
	res.sendFile(__dirname + "/Mobirise/game.html");
})
app.get("/game/request/:UserName",function(req, res){
	
})//request for new game, server recieves url encoded with the info :UserName and client recieves game id.
app.get("/game/:id(\\d+)/status",function(req, res){
	
})//returns the status of the game as a string "waiting for players, in progress, finished, Not Found 404"
app.get("/game/:id(\\d+)/results",function(req, res){
	
})//returns the results of the game, stats, who won, etc
app.get("/HowTo",function(req, res){
	res.sendFile(__dirname + "/Mobirise/HowTo.htm");
})//page that lists all the rules, and how to play the game
app.get("/leaderboard",function(req, res){
	res.sendFile(__dirname + "/Mobirise/leaderboard.htm");
})//page that lists the top players win/loss ratios


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})