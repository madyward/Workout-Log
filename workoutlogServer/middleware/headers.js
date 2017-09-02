module.exports = function(req, res, next){	//module.exports allows the function to be available in other js files
	res.header("access-control-allow-origin", "*");	//sets up response header field, with a value of "*".
	next();		//next() passes on responsibility to the next middleware function.
}