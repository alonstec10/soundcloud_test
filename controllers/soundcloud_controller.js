'use strict';
/*
* Api:
* Wrap Request callbacks
* Generate Urls
*/

var Controller 	=	function(settings)
{

	this.request 	=   require('request');
	this.ApiUrl 	=	'http://api.soundcloud.com/';
	this.ApiUrlHttps	=	'https://api.soundcloud.com/';
	this.url;


	//Requests User Info
	this.RequestUsers 	=	function(userid, callback){

		this.url		=	this.resource_url('users', userid);
		
		this.MakeRequest(this.url, callback);

	};

	//Requests User Tracks
	this.RequestTracks 	=	function(userid, callback) {

		this.url		=	this.resource_url('tracks', userid);

		this.MakeRequest(this.url, callback);

	};

	//Requests User Playlists
	this.RequestPlaylists =	function(userid, callback) {

		this.url 		=	this.resource_url('playlists', userid);

		this.MakeRequest(this.url, callback);

	};
	//Requests User Groups
	this.RequestGroups	=	function(userid, callback) {

		this.url 		=	this.resource_url('groups', userid);

		this.MakeRequest(this.url, callback);

	};
	//Requests User Comments
	this.RequestComments	=	function(userid, callback){

		this.url 		=	this.resource_url('comments', userid);

		this.MakeRequest(this.url, callback);

	};

	//Request Me 
	this.RequestMe 			=	function(token, callback){
		
		this.url 			=	this.ApiUrlHttps + 'me.json?oauth_token=' + token;

		this.MakeRequest(this.url, callback);

	};

	this.RequestMeConnections 			=	function(token, callback){
	
		this.url 			=	this.ApiUrlHttps + 'me/connections.json?oauth_token=' + token;

		this.MakeRequest(this.url, callback);

	};



	this.RequestSubresource	=	function(resource, id, subresource, callback){
		this.url 		=	this.resource_url_subresource(resource, id, subresource);

		this.MakeRequest(this.url, callback);
	};


	this.handleRequest 	=	function(error, response, body, res){
			
			if(!error &&  response.statusCode == 200) {
				res.json({ data: JSON.parse(body), success: true, url: this.url });
			}
			else {
				res.json({ data: {}, success: false, url: this.url });
			}

	};


	this.getSettings = function() {
		return settings;
	}

	this.MakeRequest 	=	function(url, callback){
		
		console.log("request url = " + url);

		this.request(url, callback);

	};

	this.resource_url 	=	function(resource, json) {
		return this.ApiUrl + resource + '/' + json + '.json?client_id=' + settings.soundcloud.clientID;
	};

	this.resource_url_subresource	=	function(resource, id, subresource){
		return this.ApiUrl + resource + '/' + id + '/' + subresource + '?client_id=' + settings.soundcloud.clientID;
	};

}



module.exports = function(settings){
	var api_interface 	=	new Controller(settings);
	return api_interface;
}