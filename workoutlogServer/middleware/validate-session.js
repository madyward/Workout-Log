//Any request that comes through our server, passes through this file! There's no stored data within this file, because
//this file occurs BEFORE a user is signed up or logged in!

var jwt = require("jsonwebtoken");
var sequelize = require("../db");
var User = sequelize.import("../models/user");

module.exports = function(req, res, next){
	var sessionToken = req.headers.authorization;

	if(!req.body.user && sessionToken){ //If there is a session token AND no user is recognized 
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded){ //Verify if session token is same
																				//as stored session token
			if(decoded){  //If session token is decoded/verified
				User.findOne({where: {id: decoded.id}}).then( //Use session token to locate (.findOne) user id
					function(user){
						req.user = user; //.user was priorly undefined, but here we declare .user as a property
						next(); //go on to the next middleware
					},
					function(){
						res.status(401).send({error: "Not authorized"}); //If no session token is matched
					}
				);
			} else {
				res.status(401).send({error: "Not authorized"}) //For all other outcomes
			}
		});
	} else {
		next();
	}
}