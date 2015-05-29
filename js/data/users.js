'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');
var underscore = require('underscore');

var users = mongoose.model('user', schemas.user);
var notifications = mongoose.model('notification', schemas.notification);
var transactions = mongoose.model('transaction', schemas.transaction);

var _getUser = function(userId) {

	var deferred = Q.defer();
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
		budget: { value: 0, transactions: [] }
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

var _removeUser = function(userId){
	users.findById(userId).remove().exec();
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
			deferred.reject(new Error(err));
			console.dir(err);
		} else{
			user.notifications.push(new notifications({
				whoChampionshipId: whoChampionshipId,
				whoUserId: whoUserId,
				text: text
			}));
			user.save(function(err){
				if(err){
					deferred.reject(new Error(err));
					console.dir(err);
				} else {
					deferred.resolve(user);
					console.log('adicionada notificação ao usuário ' + user.username);
				}
			});

			
		}
	});

	return deferred.promise;
}

//transactionType = 1-débito, 2-crédito, 3-prêmio
//status = 1 - em análise, 0 - cancelado - 2 - em andamento, 3 - concluída 
var _addUserTransaction = function(userId, value, transactionType){
	var deferred = Q.defer();

	users.findById(userId, function(err, user){
		if(err){
			deferred.reject(new Error(err));
			console.dir(err);
		} else{
			user.budget.transactions.push(new transactions({
				transactionType: transactionType,
				value: value,
				date: new Date().getTime(),
				status: 1
			}));
			
			user.save(function(err){
				if(err){
					deferred.reject(new Error(err));
					console.dir(err);
				} else {
					deferred.resolve(user);
					console.log('adicionada transação ao usuário ' + user.username);
				}
			});
		}
	});

	return deferred.promise;
}

var _changeTransactionStatus = function(userId, transactionId, newStatus, description){
	var deferred = Q.defer();

	users.findById(userId, function(err, user){
		var budgetCurrentValue = user.budget.value;

		var transaction = underscore.find(user.budget.transactions, function(object){
			return object.id == transactionId;
		});

		transaction.status = newStatus;
		transaction.description = description;

		//Se estiver concluída a ação, pode mexer na carteira do usuário com o valor da transação
		if(newStatus == 3) {
			switch(transaction.transactionType){
					case 1:
					case 3:
						budgetCurrentValue += transaction.value;
						break;
					case 2:
						budgetCurrentValue -= transaction.value;
						break;
			}
			user.budget.value = budgetCurrentValue;
		}

		user.save(function(err){
			if(err){
				deferred.reject(new Error(err));
				console.dir(err);
			} else {
				deferred.resolve(user);
				console.log('alterada a transação do usuário ' + user.username);
			}
		});
	});

	return deferred.promise;
}

var _getAll = function() {
	var deferred = Q.defer();

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

exports.getUser = _getUser;
exports.addUser = _addUser;
exports.getUserNotifications = _getUserNotifications;
exports.addUserNotification = _addUserNotification;
exports.getAll = _getAll;
exports.removeUser = _removeUser;
exports.addUserTransaction = _addUserTransaction;
exports.changeTransactionStatus = _changeTransactionStatus;