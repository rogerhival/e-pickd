'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');
var underscore = require('underscore');

var players = mongoose.model('player', schemas.player);
var contestants = mongoose.model('contestant', schemas.contestant);

var _getAll = function(){

	var deferred = Q.defer();

	players.find().exec(function(err, players){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(players);
		}
	});

	return deferred.promise;
}

var _getPlayer = function(playerId) {
	var deferred = Q.defer();

	players.findById(playerId).exec(function(err, player){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(player);
		}
	});

	return deferred.promise;
}

var _addPlayer = function(name, thumbURL, position, contestantId){
	var deferred = Q.defer();

	new players({
		name: name,
		thumbURL: thumbURL,
		position: position,
		contestantId: contestantId
	}).save(function(err, player){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			console.log('Jogador ' + name + ' criado');
			deferred.resolve(player);

			if(contestantId)
			{
				contestants.findById(contestantId).exec(function(err, contestant){
					if(err){
						console.dir(err);
					}
					else{
						if(contestant) {
							contestant.players.push(player);
						} else {
							player.contestantId = null;
							player.save();
							console.log('O time com id ' + contestantId + ' não foi encontrado');
						}
					}
				});
			}
		}
	});

	return deferred.promise;
}

exports.getAll = _getAll;
exports.getPlayer = _getPlayer;
exports.addPlayer = _addPlayer;