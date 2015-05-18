// Retrieve
var mongoose = require('mongoose');

// Url mongo db
var uriString = 'mongodb://root:root@ds031802.mongolab.com:31802/e-pickd';

mongoose.connect(uriString, function(err, res){
	if(err){
		console.log('Error connection to: ' + uriString + '. ' + err);
	}
	else
		console.log('We are connected to: ' + uriString);
});


exports.client = mongoose;

