'use strict';
var Players = require('../js/data/players.js');

//POST /player {name, thumbURL, position, contestantId}
exports.addPlayer = function(req, res) {
	var name = req.body.name;
	var thumbURL = req.body.thumbURL;
	var position = req.body.position;
	var contestantId = req.body.contestantId;

	Players.addPlayer(name, thumbURL, position, contestantId).then(function(results){
		res.status(200).json(results);
	});
}

//GET /players
exports.getAll = function(req, res){
	Players.getAll().then(function(results){
		res.status(200).json(results);
	});
}

//GET /player/:playerId
exports.getPlayer = function(req, res){
	var playerId = req.params.playerId;
	Players.getPlayer(playerId).then(function(results){
		res.status(200).json(results);
	});
}