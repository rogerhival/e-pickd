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
var users = require('./routes/users');
var championships = require('./routes/championships');
var contestants = require('./routes/contestants');
var players = require('./routes/players');

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
// POST /user - adiciona um novo user
router.post('/user', users.addUser);
// GET /users
router.get('/users', users.getAll);
// GET /users/:uid - busca user por user id (uid)
router.get('/user/:uid', users.getUser);
// GET /user/:uid/notifications - buscar notificações do usuario
router.get('/user/:uid/notifications', users.getUserNotifications);
// POST /user/:uid/notification - adiciona notificação ao usuário
router.post('/user/:uid/notification', users.addUserNotification);
//POST /user/:uid:/transaction
router.post('/user/:uid/transaction', users.addUserTransaction);
//POST /user/:uid/transaction/:transactionId/changeStatus
router.post('/user/:uid/transaction/:transactionId/changeStatus', users.changeTransactionStatus);
//DELETE /user/:uid
router.delete('/user/:uid', users.removeUser);

// CHAMPIONSHIPS
// GET /championships
router.get('/championships', championships.getAll);
// GET /championship/:championshipId
router.get('/championship/:championshipId', championships.getChampionship);
// POST /championship
router.post('/championship', championships.addChampionship);

//CONTESTANTS
// GET /contestants
router.get('/contestants', contestants.getAll);
//GET /contestant/:contestantId
router.get('/contestant/:contestantId', contestants.getContestant);
//POST /contestant
router.post('/contestant', contestants.addContestant);

//PLAYERS
//GET /players
router.get('/players', players.getAll);
//GET /player/:playerId
router.get('/player/:playerId', players.getPlayer);
//POST /player
router.post('/player', players.addPlayer);


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
