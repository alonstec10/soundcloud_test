'user strict';
var passport = require('passport'), 
  	util = require('util'),
  	SoundCloudStrategy = require('passport-soundcloud').Strategy,
  	secrets = require('../config/secrets'),
  	User = require('./user');

var SOUNDCLOUD_CLIENT_ID 		= secrets.soundcloud.clientID;
var SOUNDCLOUD_CLIENT_SECRET 	= secrets.soundcloud.clientSecret;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SoundCloudStrategy({
    	clientID: SOUNDCLOUD_CLIENT_ID,
    	clientSecret: SOUNDCLOUD_CLIENT_SECRET,
    	callbackURL: "http://localhost:3000" + secrets.soundcloud.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    // asynchronous verification, for effect...
	    
	    console.log("access token " + accessToken);


	    var json 		=	profile._json;

	    var user_id 	= 	json.id;
	    var token 		=	accessToken;
		var username 	=	json.username;
	    var soundcloud 	=	json.uri;
	    var _json 		=	JSON.stringify(profile._json);


	    console.log("username " + username);

	    User.findOne({user_id: user_id}, function(err, doc){

	    	if(doc)
	    	{
	    		
	    		User.update({ _id: doc._id }, { $set: { token: token }}, function(err, newUser){
			    	console.log("err: " + err);
			    	if(!err)
			    	{
			    		console.log("saved");
			    		process.nextTick(function () {
					      done(null, profile);
					    });		
			    	}
			    	done(null, profile);
			    });

	    	}
	    	else
	    	{
	    		var newUser 	=	new User({ username: username, soundcloud: soundcloud, token: token, user_id: user_id, _json: _json });
	    	
	    		newUser.save(function(err, newUser){
			    	console.log("err: " + err);
			    	if(!err)
			    	{
			    		console.log("saved");
			    		process.nextTick(function () {
					      done(null, profile);
					    });		
			    	}
			    	
			    });
	    	}


	    	
	    });
	
	  }
	));



module.exports 	=	passport;


