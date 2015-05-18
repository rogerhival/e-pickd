var httpresponse = require('../js/response.js');
var Hospitals = require('../js/data/hospitals.js');


// GET /hospitals - busca todos os hospitals perto dele
// - - filters required: ?lat=12.33&lon=12.33&radius=10
// - - filters optional: ?name=hps&status=ALTO|NORMAL|BAIXO

exports.getHospitals = function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    Hospitals.getHospitals(lat, lon).then(function(results){
        res.status(200).json(results);
    });
}

// POST /hospital/:id/checkin - {uid: 123, estimatedWaitingTime: 1.5}
exports.checkIn = function(req, res) {
    var hospitalId = req.params.id;
    var estimatedWaitingTime = req.body.estimatedWaitingTime;

    Hospitals.checkIn(hospitalId, estimatedWaitingTime).then(function(results){
        res.status(200).json(results);
    });
}

// POST /checkin/:id/ - {uid: 123, waitingTime: 1}
exports.checkOut = function(req, res) {
    var checkinId = req.params.id;
    var waitingTime = req.body.waitingTime;

    Hospitals.checkOut(checkinId, waitingTime).then(function(result) {
        res.status(200).json(result);
    });
}

// DELETE /hospital/:id/checkin - ?uid:123
exports.uncheck = function(req, res) {
    var r = httpresponse.create();
    r.meta.code = 200;
    r.data = null;
    r.meta.message = "Unchecked";
    res.status(200).json(r);
}
