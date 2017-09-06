/* Headers allow information to be passed from one DOMAIN (not just file!!) to another */

module.exports = function(req, res, next){	//module.exports allows the function to be available in other js files
	res.header("access-control-allow-origin", "*");	//sets up response header field, with a value of "*" (* is allow everything). "access-control-allow-origin" allows Cross-Origin Requests by overriding (locked down by default in browsers)
	res.header("access-control-allow-methods", "GET, POST, PUT, DELETE"); //allows headers to have GET/POST/PUT/DELETE requests
	res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");//this sets what will happen within the header to handle authorization in next app
	next();		//next() passes on responsibility to the next middleware function, or tells it keep the request going until it's handled
}