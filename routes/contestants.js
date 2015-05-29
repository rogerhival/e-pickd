'use strict';
var Contestants = require('../js/data/contestants.js');

//POST /contestant { name, acronym, location, flagURL, players }
exports.addContestant = function(req, res){
	var name = req.body.name;
	var acronym = req.body.acronym;
	var location = req.body.location;
	var flagURL = req.body.flagURL;
	var players = req.body.players;

	Contestants.addContestant(name, acronym, location, flagURL, players).then(function(results){
		res.status(200).json(results);
	});
}

//GET /contestants
exports.getAll = function (req, res){
	Contestants.getAll().then(function(results){
		res.status(200).json(results);
	});
}

//GET /contestant/:contestantId
exports.getContestant = function(req, res){
	var contestantId = req.params.contestantId;
	Contestants.getContestant(contestantId).then(function(results){
		res.status(200).json(results);
	});
}