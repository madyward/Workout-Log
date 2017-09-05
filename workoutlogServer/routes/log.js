var router = require("express").Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var User = sequelize.import("../models/user");
var Definition = sequelize.import("../models/definition");

router.post("/", function(req, res){
	//req has some body properties that have a username and password
	var description = req.body.log.description;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;

	//use sequelize model to create log
	Log
	.create({
		description: description,
		result: result,
		owner: user.id,
		def: definition
	})
	.then(
		function createSuccess(log){
			res.json(log);
	},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

router.get("/", function(req, res){
	var userid = req.user.id;
	Log
	.findAll({
		where: {owner: userid}
	})
	.then(
		function findAllSuccess(data){
			//console.log(data);
			res.json(data);
		},
		function findAllError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;