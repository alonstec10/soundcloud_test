'user strict';
var secrets 	=	require('./config/secrets');

var DB 	=	function(){
	var dns 		=	secrets.db;
	var mongoose 	=	require('mongoose');

	mongoose.connect(dns, { server : { autoReconnect: true, socketOptions: { connectTimeoutMS: 10000 } }});
	mongoose.connection.on('error', function(err) {
	  console.error('MONGO ERROR: Something broke!');
	  console.log(err);
	});

	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  console.log('Mongoose default connection error: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  console.log('Mongoose default connection disconnected'); 
	});

	return mongoose;
};



module.exports 	=	DB();


 

