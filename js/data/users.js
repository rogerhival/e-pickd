'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');

var users = mongoose.model('user', schemas.user);
var notifications = mongoose.model('notification', schemas.notification);

var _getUser = function(userId) {

	var deferred = Q.defer();

	console.log('user id: ' + userId);
	//get users
	users.findById(userId).exec(function(err, user){
		if(err) {
			console.dir(err);
			deferred.reject(new Error(err));
		}
		else{
			console.log(user);
			deferred.resolve(user);
		}
	});

	return deferred.promise;
}

var _addUser = function(name, email, username, password, authenticationMode, thumbURL, tokenId){
	var deferred = Q.defer();

	new users({
		fullName: name,
		authenticationMode: authenticationMode,
		createDate: new Date().getTime(),
		thumbURL : thumbURL,
		tokenId: tokenId,
		email: email,
		username:username,
		password:password,
		notifications:[],
		transactions:[]
	}).save(function(err, user){
		if(err){
			deferred.reject(new Error(err));
			console.dir(err);
		}else{
			console.log('Usuário '+ name +' adicionado');
			deferred.resolve(user);
		}
	});

	return deferred.promise;
}

var _getUserNotifications = function(userId) {
	var deferred = Q.defer();

	users.findById(userId).select('notifications').exec(function (err, notifications){
		if(err) {
			console.dir(err);
			deferred.reject(new Error(err));
		} else {
			console.log(notifications);
			deferred.resolve(notifications);
		}
	});

	return deferred.promise;
}

var _addUserNotification = function(userId, text, whoChampionshipId, whoUserId) {

	var deferred = Q.defer();

	users.findById(userId, function(err, user){
		if(err){
			deferred.reject(err);
			console.dir(err);
		} else{
			user.notifications.push(new notifications({
				whoChampionshipId: whoChampionshipId,
				whoUserId: whoUserId,
				text: text
			}));
			user.save(function(err){
				if(err){
					console.dir(err);
				} else {
					console.log('adicionada notificação ao usuário ' + user.username);
				}
			});

			deferred.resolve(user);
		}
	});

	return deferred.promise;
}

var _getAll = function() {
	var deferred = Q.defer();

	//get users
	users.find().exec(function(err, users){
		if(err) {
			console.dir(err);
			deferred.reject(new Error(err));
		}
		else{
			console.log(users);
			deferred.resolve(users);
		}
	});

	return deferred.promise;
}

_getUserNotifications('555a1e32a89044c8051f3452');

exports.getUser = _getUser;
exports.addUser = _addUser;
exports.getUserNotifications = _getUserNotifications;
exports.addUserNotification = _addUserNotification;
exports.getAll = _getAll;