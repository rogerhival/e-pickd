'use strict';
var mongoose = require('../connect.js').client;
var schemas = require('../schemas.js');
var Q = require('q');

var hospitals = mongoose.model('hospitals', schemas.hospital);
var checkin = mongoose.model('checkins', schemas.checkin);

var _getHospitals = function(lat, lon){

	var deferred = Q.defer();
	//get hospitals
	// hospitals.find({location: {$near: [lat, lon], $maxDistance: 1}})
	// .limit(20)
	// .sort('-createDate')
	//.exec(function(err, hospitals){

	var point = { type: "Location", coordinates: [lat, lon]};
	// hospitals.collection.geoNear(parseFloat(lon), parseFloat(lat), { distance: parseFloat(6000) / 6378.137}, function (err, hospitals) {
	hospitals.find( { location: { $within: { $centerSphere: [ [ lat, lon ] ,
                                                     30 / 6378.137 ] } } } )
													.exec(function(err, hospitals){
		if(err) {
			console.dir(err);
			deferred.reject(new Error(err));
		}
		else{
			console.log('getHospitals ok');
			console.dir(hospitals);

			var geolib = require('geolib')
			for(var i = 0; i < hospitals.length; i++) {
				hospitals[i]._doc.distance = geolib.getDistance(
						{latitude: lat, longitude: lon},
						{latitude: hospitals[i].location[0], longitude: hospitals[i].location[1]}

				)/1000;
			}

			deferred.resolve(hospitals);
		}
	});

	return deferred.promise;
}

var _checkIn = function(hospitalId, userId, estimatedWaitingTime){
	return new checkin ({
		userId: userId,
		hospitalId: hospitalId,
		dateIn: new Date().getTime(),
		dateOut: null,
		status: false,
		estimatedWaitingTime: estimatedWaitingTime,
		waitingTime: null
	}).save(function(err){
		if(err) {
			console.dir(err);
		}
		else{
			console.log('ID DO HOSPITAL MAROTO: ' + hospitalId);
			hospitals.findById(hospitalId, function(err, resultHospital){
				if(err){
					console.dir(err);
				} else {
					if(resultHospital == null)
						resultHospital.checkin = 1;
					else
						resultHospital.checkin++;

					resultHospital.save(function (err) {
						if(err) {
							console.dir(err);
						}
						else {
							console.log('hospital ' + resultHospital.name + ' teve seu checkin atualizado: ' + resultHospital.checkin);
						}
					});
				}
			});

			console.log('Novo checkin ok');
		}
	});
}



var _checkOut = function(checkinId, waitingTime){

	var deferred = Q.defer();
	//update checkin
	checkin.findByIdAndUpdate(checkinId, {'waitingTime': waitingTime, status: true}, function(err, checkin){
		if(err){
			console.dir(err);
			return deferred.resolve({result: false});
		}
		else{
			hospitals.findById(checkin.hospitalId, function(err, hospital){
				if(err){
					console.dir(err);
				} else {
					hospital.checkin--;
					hospital.save(function (err) {
						if(err)
							console.dir(err);
						else
							console.log('hospital ' + hospital.name + ' teve seu checkin atualizado: ' + hospital.checkin);

						deferred.resolve({result: true});
						console.log('Alteração do checkin' + checkinId + ' ok !');
					});
				}
			});
		}
	});
	return deferred.promise;
}

var _uncheck = function(chekinId){
	//TODO
}

exports.getHospitals = _getHospitals;
exports.checkIn = _checkIn;
exports.checkOut = _checkOut;
exports.uncheck = _uncheck;
