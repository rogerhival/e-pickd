'use strict';
var httpresponse = require('../js/response.js');
var Users = require('../js/data/users.js');

// POST /user - adiciona um novo user
exports.addUser = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var authenticationMode = req.body.authenticationMode;
    var thumbURL = req.body.thumbURL;
    var tokenId = req.body.tokenId;

    Users.addUser(name, email, username, password, authenticationMode, thumbURL, tokenId).then(function(results){
        res.status(200).json(results);
    });
}

// GET /users
exports.getAll = function(req, res){
    Users.getAll().then(function(results){
        res.status(200).json(results);
    });
}

// GET /user/:uid - busca user por user id (uid)
exports.getUser = function(req, res) {
    var userId = req.params.uid;

    Users.getUser(userId).then(function(results){
        res.status(200).json(results);
    });
}

// GET /user/:uid/notifications
exports.getUserNotifications = function(req, res){
    var userId = req.params.uid;

    Users.getUserNotifications(userId).then(function(results){
        res.status(200).json(results);
    });
}


// POST /user/:uid/notification {text: 'blabla', whoChampionshipId: 1, whoUserId: 2}
exports.addUserNotification = function(req, res){
    var userId = req.params.uid;
    var text = req.body.text;
    var whoChampionshipId = req.body.whoChampionshipId;
    var whoUserId = req.body.whoUserId;

    Users.addUserNotification(userId, text, whoChampionshipId, whoUserId).then(function(results){
        res.status(200).json(results);
    });
}


//DELETE /user/:uid
exports.removeUser = function(req, res){
    var userId = req.params.uid;

    Users.removeUser(userId).then(function(results){
        res.status(200).json(results);
    });
}

//POST /user/:uid/transaction/:transactionId/changeTransactionStatus {newStatus: 1, description: 'hahaha'}
exports.changeTransactionStatus = function(req, res){
    var userId = req.params.uid;
    var transactionId = req.param.transactionId;
    var newStatus = req.body.newStatus;
    var description = req.body.description;

    Users.changeTransactionStatus(userId, transactionId, newStatus, description).then(function(results){
        res.status(200).json(results);
    });
}

//POST /user/:uid/transaction
exports.addUserTransaction = function(req, res){
    var userId = req.params.uid;
    var value = req.body.value;
    var transactionType = req.body.transactionType;

    Users.addUserTransaction(userId, value, transactionType).then(function(results){
        res.status(200).json(results);
    });
}
