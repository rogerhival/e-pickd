'use strict';

// Require config & logging modules
var config = require('config');
var winston = require('winston');

//New Relic setup
// if(config.get('newrelic.use') === true) {
//   require('newrelic');
// }

// Bring in Express 4.0 framework
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var morgan = require('morgan');

// cors
var cors = require('cors');

// Bring in route services
var hospitals = require('./routes/hospitals');
var users = require('./routes/users');
var comments = require('./routes/comments')

// Initialize & Configure Express Server
var app = express();
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json({limit: '1mb'})); // for parsing application/json

app.use(compression()); // compress all requests
app.use(cors());
//app.use(db);

// TODO: Set up access logs to write to a file
// var stream = require('logrotate-stream');
// var accessLogStream = stream({ file: config.get('logs.access.path'), size: config.get('logs.access.size'), keep: config.get('logs.access.keep') });
// app.use(morgan('combined', {
//   stream: accessLogStream
// }));

// Set up the router
var router = express.Router();
router.get('/', function (req, res) {
  res.json({
    result: 'success'
  });
});

// Define service routes
// POST /users - adiciona um novo user
router.post('/users', users.addUser);
router.get('/users', users.getAll);
// GET /users/:uid - busca user por user id (uid)
router.get('/user/:uid', users.getUsers);
// GET /user/:uid/notifications - buscar notificações do usuario
router.get('/user/:uid/notifications', users.getUserNotifications);
// POST /user/:uid/notification - adiciona notificação ao usuário
router.post('/user/:uid/notification', users.addUserNotification);



// GET /hospital/:id/comments - busca todos os comments do hospital
router.get('/hospital/:id/comments', comments.getComments)
// POST /hospital/:id/comments - {uid: 123, comment: 'fail'}
router.post('/hospital/:id/comments', comments.postComment)
// POST /comments/:id/up - thumbs up no comentario
router.post('/comments/:id/up', comments.like)
// POST /comments/:id/down - thumbs down no comentario
router.post('/comments/:id/down', comments.dislike)

// GET /hospitals - busca todos os hospitals perto dele
router.get('/hospitals', hospitals.getHospitals)
// POST /hospital/:id/checkin - {uid: 123, estimatedWaitingTime: 1.5}
router.post('/hospital/:id/checkin', hospitals.checkIn)
// POST /checkin/:id/checkout - {uid: 123, waitingTime: 1}
router.post('/checkin/:id/checkout', hospitals.checkOut)
// DELETE /hospital/:id/checkin - ?uid:123
router.delete('/hospital/:id/checkin', hospitals.uncheck)

router.get('/healthcheck', function (req, res)
{
    res.status(200).send();
});

// Assign the router to everything under /api
app.use('/api/', router);

//error handling
 app.use(function(err, req, res, next) {
      // log it
      winston.error(err.stack);
      // respond with 500 "Internal Server Error".
      res.sendStatus(500);
  });

//   __  __    __    ____  _  _
//  (  \/  )  /__\  (_  _)( \( )
//   )    (  /(__)\  _)(_  )  (
//  (_/\/\_)(__)(__)(____)(_)\_)

console.log('');
console.log('***************************************************************');
console.log('Launching server on port ' + app.get('port'));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
