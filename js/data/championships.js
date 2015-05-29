'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');
var underscore = require('underscore');

var championships = mongoose.model('championship', schemas.championship);

var _getAll = function(){

	var deferred = Q.defer();

	championship.find().exec(function(err, championships){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(championships);
		}
	});

	return deferred.promise;
}

var _getChampionship = function(championshipId) {
	var deferred = Q.defer();

	championship.findById(championshipId).exec(function(err, championship){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(championship);
		}
	});

	return deferred.promise;
}

var _addChampionship = function(tournamentName, namePublic, contestants, dateBegin, season){
	var deferred = Q.defer();

	new championships({
		tournamentName: tournamentName,
		namePublic: namePublic,
		contestants: contestants,
		dateBegin: dateBegin,
		season: season,
		isFinished: false
	}).save(function(err, championship){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			console.log("Adicionado novo torneio com sucesso");
			deferred.resolve(championship);
		}
	});

	return deferred.promise;
}

exports.getAll = _getAll;
exports.getChampionship = _getChampionship;
exports.addChampionship = _addChampionship;