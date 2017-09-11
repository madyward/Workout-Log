var router = require("express").Router(); //Router() tells express to handle all things router
var sequelize = require("../db.js");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = sequelize.import("../models/user.js");


router.post("/", function(req, res){
	User.findOne( { where: {username: req.body.user.username} } ).then( //Reminder: findOne (from Sequelize) finds user
		function(user){
			if (user){
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){ //bcrypt compares password
																	  //that is given via request with password stored in db
					if (matches){
						var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
						res.json({
							user: user,
							message: "Successfully authenticated",
							sessionToken: token
						});
					}else {
						res.status(500).send({ error: "Failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "Failed to authenticate"});
			}
		},
		function(err){				//<------ this error is returned if there is no username in the database
			res.json(err);
		}
	);
});

module.exports = router;