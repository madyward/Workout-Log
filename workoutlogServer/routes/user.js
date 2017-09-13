var router = require("express").Router(); //Express router receives the requests (whereas AJAX sends requests)
var sequelize = require("../db.js"); //Imports sequelize from db.js file
var User = sequelize.import("../models/user"); //Imports user model from /models/user.js file
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


router.post("/", function(req, res){ //This is saying, when a user makes a POST request, respond with these instructions:
	var username = req.body.user.username; //A request is an object, the body has a user object with a username field
	var pass = req.body.user.password;		//and a password field.
	var dob = req.body.user.dob;

	User.create({	//Sequelize method to create a...  ||
		username: username, //username, which equals username, and...
		passwordhash: bcrypt.hashSync(pass, 10), //password hash
		dob: dob
	}).then( //.then creates a promise for success and an error
		
		function createSuccess(user){
			var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); //JWT has a method called sign.
															//It must have a secret string that can always be referred back to
															//and an expiration for how long the user can hold on to the token
															//{id: user.id} validates the user (the user ID is used to verify
															//a user, because an ID is an unique identifier. Multiple users
															//can always send the same data, but no two users have the same
															//ID! 
			res.json({ 	//Response with json object
				user: user,					
				message: "create",								/*<---- If successful*/
				sessionToken: token 
			});
		},
		function createError(err){
			res.send(500, err.message);				/*<----- If unsuccessful*/
		}
	);
});

module.exports = router;


//**********************************************************************************
//************************** NOTE: *************************************************
//***  var username = req.body.user.username; //<------ .username needs to match ***
//***  var pass = req.body.user.password;   //<------- .password needs to match  ***
//**********************************************************************************