'user strict';
var app = require('../app'),
	request = require('supertest'),
	User 	=	require('../models/user'), 
	db = require('../db'),
	settings = require('../config/secrets'),
	api_interface =	require('../controllers/soundcloud_controller')(settings),
	util = require('util'), 
	assert = require('assert');

var userid =	'156486454';
var baduserid 	=	'1564864542';

describe("Testing for soundcloud api calls", function(){

	describe("Testing Requests to api", function(){
		it("Test Api Users Request", function(done){
			// http://api.soundcloud.com/users/3207.json?client_id=YOUR_CLIENT_ID

			var userid =	'156486454';
			var baduserid 	=	'1564864542';
			api_interface.RequestUsers(userid, function(error, response, body){
				
				//console.log(util.inspect(body));
				//console.log(typeof response.statusCode);
				//console.log(response.statusCode);
				var json 	=	eval('(' + body + ')');

				assert.deepEqual(response.statusCode, 200, "Response code is 200");
				//for good id
				assert.deepEqual(json.id, userid);

				done();
			});

		});

		it("Test Api Tracks Request", function(done){

			//this one works
			//my id does not
			var id =	'13158665'

			api_interface.RequestTracks(id, function(error, response, body){
				
				//console.log(util.inspect(body));
				//console.log(typeof response.statusCode);
				//console.log(response.statusCode);
				var json 	=	eval('(' + body + ')');

				//console.log(util.inspect(json));

				assert.deepEqual(response.statusCode, 200, "Response code is 200");
				//for good id
				assert.deepEqual(json.id, id);

				done();
			});
	
		});

		it("Test Api Playlist Request", function(done){

			//this one works
			//my id does not
			var id =	'405726'

			api_interface.RequestPlaylists(id, function(error, response, body){
				
				//console.log(util.inspect(body));
				//console.log(typeof response.statusCode);
				//console.log(response.statusCode);
				var json 	=	eval('(' + body + ')');

				//console.log(util.inspect(json));

				assert.deepEqual(response.statusCode, 200, "Response code is 200");
				//for good id
				assert.deepEqual(json.id, id);

				done();
			});
	
		});

		it("Test User insert ", function(done){
			var newUser 	=	new User({ 	username: 'test', 
											soundcloud: 'testsound', 
											token: 'fu712sgasdp123', 
											user_id: '123342342344', _json: {} });
	  
			newUser.save(function(err, newUser){

				if(!err) {
					console.log(util.inspect(newUser));
					assert.deepEqual(newUser.username, 'test');
				}


			});

			done();
		});
		


	});	
	




});





