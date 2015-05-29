'use strict';
var Championships = require('../js/data/championships.js');

// POST /championship { tournamentName: '', publicName: '', contestants: [], dateBegin: '',  }
exports.addChampionship = function(req, res){
	var tournamentName = req.body.tournamentName;
	var publicName = req.body.publicName;
	var contestants = req.body.contestants;
	var dateBegin = req.body.dateBegin;

	Championships.addChampionship(tournamentName, publicName, contestants, dateBegin).then(function(results){
		res.status(200).json(results);
	});
}

// GET /championships
exports.getAll = function(req, res){
	Championships.getAll().then(function(results){
		res.status(200).json(results);
	});
}

// GET /championship/:championshipId
exports.getChampionship = function(req, res){
	var championshipId = req.params.championshipId;

	Championships.getChampionship(championshipId).then(function(results){
		res.status(200).json(results);
	});
}