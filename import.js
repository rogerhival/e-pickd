'use strict';
var mongoose = require('./js/connect.js').client;
var schemas = require('./js/schemas.js');

var hospital = mongoose.model('hospital', schemas.hospital);


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('doctorpoa.csv');

lr.on('error', function (err) {
    // 'err' contains error object
});

var first = true;
lr.on('line', function (line) {
    if(first) {
        first = false;
    }
    else {

        //Tipo Instituição;Tipo Emergência;Nome;Endereço;Telefone;Latitude;Longitude;Link pt;Link en;Link es;Especialidades pt;Especialidades en;Especialidades es
        var values = line.split(';');
        var h = {
            "institutionType": values[0],
            "type":values[1],
            "name":values[2],
            "address":values[3],
            "phone":values[4],
            "location":[values[5].replace(',', '.'),values[6].replace(',', '.')],
            "tags":values[10],
            "checkin":0
        }
        return new hospital(h).save(function(err){
    		if(err){
    			console.dir(err);
    		}else{
    			console.log('hospital added');
    		}
    	});
        // console.dir(h);
        // return;
    }
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
    // All lines are read, file is closed now.
});
