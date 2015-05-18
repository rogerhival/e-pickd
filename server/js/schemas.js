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
	budgetId: {type:Number},
	transactionType: {type:String},
	value: {type:Number},
	date: {type:Date},
	status:{type:String}
});

var _userSchema = new mongoose.Schema({
	fullName: {type:String},
	email: {type:String},
	createDate: {type:Date, default: Date.now},
	username: {type: String},
	password: {type:String},
	thumbUrl: {type:String},
	tokenId: {type:String},
	authenticationMode: {type:String},
	notifications:[_notificationSchema],
	transactions: [_transactionSchema]
});

var _budgetSchema = new mongoose.Schema({
	_id: {type: Number},
	userId: {type: Number},
	value: {type:Number}
});

var _playerSchema = new mongoose.Schema({
	_id: {type:Number},
	name: {type:String},
	thumbURL: {type:String},
	position: {type: String}
});

var _contestantSchema = new mongoose.Schema({
	_id: {type: Number},
	name: {type:String},
	acronym: {type: String},
	location: {type:String},
	flagURL: {type:String},
	players: [_playerSchema]
});

var _championshipSchema = new mongoose.Schema({
	_id: {type:Number},
	tournamentName: {type: String},
    namePublic: {type:String},
    contestants: [_contestantSchema],
    isFinished: {type:Boolean},
    dateBegin: {type:Date},
    dateEnd: {type:Date},
    noVods: {type:Number},
    season: {type:String},
    published: {type:Boolean},
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
exports.budget = _budgetSchema;
exports.player = _playerSchema;
exports.contestant = _contestantSchema;
exports.championship = _championshipSchema;
exports.playerMatch = _playerMatchSchema;
exports.teamMatch = _teamMatchSchema;
exports.match = _matchSchema;


var _hospitalSchema = new mongoose.Schema(
{
	institutionType: String,
	name: String,
	type: String,
	address: String,
	phone: String,
	location: {type: [Number], index: '2d'},
	tags: String,
	checkin: Number
});

var _checkinSchema = new mongoose.Schema({
	userId: {type: String},
	hospitalId: {type: String},
	dateIn: {type: Date, required: true },
	dateOut: {type: Date },
	status: Boolean,
	estimatedWaitingTime: Number,
	waitingTime: Number
});

var _commentsSchema = new mongoose.Schema({
	userName: String,
	userThumb: String,
	hospitalId: String,
	date: Date,
	comment: String,
	thumbsUp: Number,
	thumbsDown: Number
});


exports.hospital = _hospitalSchema;
exports.checkin = _checkinSchema;
exports.comment = _commentsSchema;
