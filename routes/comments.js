'use strict';
var httpresponse = require('../js/response.js');
var Comments = require('../js/data/comments.js');

// GET /hospital/:id/comments - busca todos os comments do hospital
// - - sort by: LASTEST COMMENTS | MOST LIKED
exports.getComments = function(req, res) {
    var hospitalId = req.params.id;
    Comments.getComments(hospitalId).then(function(results){
      res.status(200).json(results);
    });
}

// POST /hospital/:id/comments - {uid: 123, comment: 'fail'}
exports.postComment = function(req, res) {
  var userName = req.body.userName;
  var userThumb = req.body.userThumb;
  var hospitalId = req.params.id;
  var comment = req.body.comment;

  Comments.postComment(comment, userName, userThumb, hospitalId).then(function(results){
    res.status(200).json(results);
  });
}

// POST /comments/:id/up - thumbs up no comentario
exports.like = function(req, res) {
    var commentId = req.params.id;

    Comments.like(commentId).then(function(results){
      res.status(200).json(results);
    });
}

// POST /comments/:id/down - thumbs down no comentario
exports.dislike = function(req, res) {
    var commentId = req.params.id;

    Comments.dislike(commentId).then(function(results){
      res.status(200).json(results);
    });
}
