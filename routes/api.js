'user strict';
var express = require('express');
var router 	= express.Router(),
	request = require('request'),
	settings = require('../config/secrets'),
	User = require('../models/user'),
	api_interface =	require('../controllers/soundcloud_controller')(settings), 
	util = require('util');

/*
 * Get User information
 * http://api.soundcloud.com/users/3207.json?client_id=YOUR_CLIENT_ID
 * and subresources
 */

router.get('/users', function(req, res, next) {

	var passport 	=	req.session.passport;
	
	if(passport.user && passport.user.id) {
		
		//Makes Request to api and handles response
		api_interface.RequestUsers(passport.user.id, function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, '', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/tracks', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/playlists', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/followings', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/followers', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/comments/', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});

router.get('/users/:id/favorites/', function(req, res, next){

	var userid 	=	req.params.id;
	
	if(userid && userid > 0) {
		
		//Makes Request to api and handles response
		//resource, id, subresource, callback
		api_interface.RequestSubresource('users', userid, 'tracks', function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	} else {

		res.json({ data: {}, success: false , message: 'no user set'});
	
	}

});


/*
 * Get Track information
 * http://api.soundcloud.com/tracks/13158665.json?client_id=YOUR_CLIENT_ID
 */
router.get('/tracks', function(req, res, next){

	var passport 	=	req.session.passport;
	
	if(passport.user && passport.user.id) {
		
		api_interface.RequestTracks(passport.user.id, function(error, response, body){
			
			api_interface.handleRequest(error, response, body, res);
		
		});

	}
	else {
		res.json({ data: {}, success: false});
	}

	
});

/*
 * Get playlist from user
 * http://api.soundcloud.com/playlists/405726.json?client_id=YOUR_CLIENT_ID
 */
router.get('/playlists', function(req, res, next){


	var passport 	=	req.session.passport;
	
	if(passport.user && passport.user.id) {
		
		api_interface.RequestPlaylists(passport.user.id, function(error, response, body){

			api_interface.handleRequest(error, response, body, res);

		});

	}
	else {
		res.json({ data: {}, success: false});
	}

	
});

/*
 * Get groups from user
 * http://api.soundcloud.com/groups/405726.json?client_id=YOUR_CLIENT_ID
 */
router.get('/groups/:groupid', function(req, res, next){

	var groupid 	=	req.params.groupid;

	if(groupid && groupid > 0) {
		

		api_interface.RequestGroups(groupid, function(error, response, body){

			api_interface.handleRequest(error, response, body, res);

		});

	}
	else {
		res.json({ data: {}, success: false});
	}

	
});

/*
 * Get comments from user
 * http://api.soundcloud.com/comments/405726.json?client_id=YOUR_CLIENT_ID
 */
router.get('/comments', function(req, res, next){


	var passport 	=	req.session.passport;
	
	if(passport.user && passport.user.id) {

		var userid 		=	user.id;

		api_interface.RequestComments(passport.user.id, function(error, response, body){

			api_interface.handleRequest(error, response, body, res);

		});
	}
	else {
		res.json({ data: {}, success: false});
	}

	
});


/*
 * Get information for user
 * https://api.soundcloud.com/me.json?oauth_token=A_VALID_TOKEN
 */
router.get('/me', function(req, res, next){


	var passport 	=	req.session.passport;
	var user 		=	passport.user;
	var code 		=  	req.session.code;
	var token 		=	user.token; 
	
	if(user && code) {

		
		var userid 		=	user.id;

		//get token
		User.findOne({user_id: userid}, {token: 1}, function(err, doc){



			api_interface.RequestMe(doc.token, function(error, response, body){

				api_interface.handleRequest(error, response, body, res);

			});

		});
		
	}
	else {
		res.json({ data: {}, success: false});
	}
	
});

router.get('/me/connections', function(req, res, next){


	var passport 	=	req.session.passport;
	var user 		=	passport.user;
	var code 		=  	req.session.code;
	var token 		=	user.token; 
	
	if(user && code) {

		
		var userid 		=	user.id;

		//get token
		User.findOne({user_id: userid}, {token: 1}, function(err, doc){

			api_interface.RequestMe(doc.token, function(error, response, body){

				api_interface.handleRequest(error, response, body, res);

			});
		
		});
		
	}
	else {
		res.json({ data: {}, success: false});
	}
	
});


module.exports = router;