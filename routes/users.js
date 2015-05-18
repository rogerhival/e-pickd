var httpresponse = require('../js/response.js');
var Users = require('../js/data/users.js');

// POST /users - adiciona um novo user
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

exports.getAll = function(req, res){
    Users.getAll().then(function(results){
        res.status(200).json(results);
    });
}

// GET /users/:uid - busca user por user id (uid)
exports.getUsers = function(req, res) {
    var userId = req.param.uid;

    Users.getUser(userId).then(function(results){
        res.status(200).json(results);
    });
}

exports.getUserNotifications = function(req, res){
    var userId = req.param.uid;

    Users.getUserNotifications(userId).then(function(results){
        res.status(200).json(results);
    });
}

exports.addUserNotification = function(req, res){
    var userId = req.param.uid;
    var text = req.body.text;
    var whoChampionshipId = req.body.whoChampionshipId;
    var whoUserId = req.body.whoUserId;

    Users.addUserNotification(userId, text, whoChampionshipId, whoUserId).then(function(results){
        res.status(200).json(results);
    });
}
