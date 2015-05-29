'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');
var underscore = require('underscore');

var players = mongoose.model('player', schemas.player);
var contestants = mongoose.model('contestant', schemas.contestant);

var _getAll = function(){
	var deferred = Q.defer();

	contestants.find().exec(function(err, contestants){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(contestants);
		}
	});

	return deferred.promise;
}

var _getContestant = function(contestantId){
	var deferred = Q.defer();

	contestants.findById(contestantId).exec(function(err, contestant){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(contestant);
		}
	});

	return deferred.promise;
}

var _addContestant = function(name, acronym, location, flagURL, players) {
	var deferred = Q.defer();

	new contestants({
		name: name,
		acronym: acronym,
		location: location,
		flagURL: flagURL,
		players: players
	}).save(function (err, contestant){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			console.log('Adicionado novo time(contestant) com sucesso.');
			deferred.resolve(contestant);
		}
	});

	return deferred.promise;
}

exports.getAll = _getAll;
exports.getConstentant = _getContestant;
exports.addContestant = _addContestant;