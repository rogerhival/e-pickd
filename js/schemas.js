'use strict';
var mongoose = require('./connect.js').client;

var _notificationSchema = new mongoose.Schema({
	whoChampionshipId: {type:String},
	whoUserId: {type:String},
	text: {type:String},
	isReaded: {type:Boolean, default:false},
	date: {type:Date, default:Date.now}
});

var _transactionSchema = new mongoose.Schema({
	transactionType: {type:String},
	value: {type:Number},
	date: {type:Date},
	status:{type:String},
	description:{type:String}
});

var _userSchema = new mongoose.Schema({
	fullName: {type:String},
	email: {type:String},
	createDate: {type:Date, default: Date.now},
	username: {type: String},
	password: {type:String},
	thumbURL: {type:String},
	tokenId: {type:String},
	authenticationMode: {type:String},
	notifications:[_notificationSchema],
	budget: {
		value: {type:Number},
		transactions: [_transactionSchema]
	}
});

var _playerSchema = new mongoose.Schema({
	name: {type:String},
	thumbURL: {type:String},
	position: {type: String},
	contestantId: {type: mongoose.Schema.Types.ObjectId, ref: 'contestant'}
});

var _contestantSchema = new mongoose.Schema({
	name: {type:String},
	acronym: {type: String},
	location: {type:String},
	flagURL: {type:String},
	players: [_playerSchema]
});

var _championshipSchema = new mongoose.Schema({
	tournamentName: {type: String},
    namePublic: {type:String},
    contestants: [_contestantSchema],
    isFinished: {type:Boolean},
    dateBegin: {type:Date},
    dateEnd: {type:Date},
    season: {type:String},
    winner: {type:String}
});

var _playerMatchSchema = new mongoose.Schema({
	playerId: {type:Number},
	kills: {type:Number},
	deaths: {type:Number},
	assists: {type:Number},
	minionKills: {type:Number},
	doubleKills: {type:Number},
	tripleKills: {type:Number},
	quadraKills: {type:Number},
	pentaKills: {type:Number},
	playerName: {type:String},
	role: {type:String}
});

var _teamMatchSchema = mongoose.Schema({
	teamId: {type:Number},
	teamName: {type:String},
	matchVictory:{type: Number},
	matchDefeat: {type:Number},
	baronsKilled: {type: Number},
	dragonsKilled: {type:Number},
	firstBlood: {type:Number},
	firstTower: {type:Number},
	firstInhibitor: {type:Number},
	towersKilled:{type:Number}
});

var _matchSchema = new mongoose.Schema({
	_id:{type:Number},
	date: {type:Date},
	teams: [_teamMatchSchema],
	players: [_playerMatchSchema]
});


var _userTeamSchema = new mongoose.Schema({
	_id: {type:Number},
	teamName: {type:String},
	players:[_playerMatchSchema],
	sallary: {type:Number}
});

exports.notification = _notificationSchema;
exports.transaction = _transactionSchema;
exports.user = _userSchema;
exports.player = _playerSchema;
exports.contestant = _contestantSchema;
exports.championship = _championshipSchema;
exports.playerMatch = _playerMatchSchema;
exports.teamMatch = _teamMatchSchema;
exports.match = _matchSchema;
