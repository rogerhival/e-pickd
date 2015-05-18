'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');

var comments = mongoose.model('comments', schemas.comment);
var hospitals = mongoose.model('hospitals', schemas.hospital);

var _getComments = function(hospitalId) {
	var deferred = Q.defer();

	comments.find({'hospitalId': hospitalId}).exec(function(err, resultComments){
		if(err){
			console.dir(err);
			deferred.reject(new Error(err));
		} else{
			console.log('getComments ok');
			console.dir(resultComments);
			deferred.resolve(resultComments);
		}
	});

	return deferred.promise;
}


var _postComment = function(userComment, userName, userThumb, hospitalId){
	return new comments({
		userName: userName,
		userThumb: userThumb,
		hospitalId: hospitalId,
		date: new Date().getTime(),
		comment: userComment,
		thumbsUp: 0,
		thumbsDown: 0
	}).save(function(err){
		if(err){
			console.dir(new Error(err));
		} else {
			console.log('Novo comments ok');
		}
	});
}

var _like = function(commentId){

	var deferred = Q.defer();

	comments.findById(commentId, function(err, resultComment){
		if(err){
			console.dir(new Error(err));
			return deferred.resolve({result: false});
		} else {
			resultComment.thumbsUp++;
			resultComment.save(function(err){
				if(err) {
					console.dir(new Error(err));
					return deferred.resolve({result: false});
				}
				else {
					console.log('O comentário ' + commentId + ' recebeu um like');
					return deferred.resolve({result: true});
				}
			});
		}
	});

	return deferred.promise;
}

var _dislike = function(commentId) {

	var deferred = Q.defer();

	comments.findById(commentId, function(err, resultComment){
		if(err){
			console.dir(new Error(err));
			return deferred.resolve({result: false});
		} else {
			resultComment.thumbsDown++;
			resultComment.save(function(err){
				if(err) {
					console.dir(new Error(err));
					return deferred.resolve({result: false});
				}
				else {
					console.log('O comentário ' + commentId + ' recebeu um dislike');
					return deferred.resolve({result: true});
				}
			});
		}
	});

	return deferred.promise;
}

exports.getComments = _getComments;
exports.postComment = _postComment;
exports.like = _like;
exports.dislike = _dislike;
