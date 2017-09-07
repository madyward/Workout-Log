var router = require("express").Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var User = sequelize.import("../models/user");
var Definition = sequelize.import("../models/definition");

router.post("/", function(req, res){
	//req has some body properties that have a username and password
	console.log(req.body);
	var description = req.body.log.desc;
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

//This will retrieve one workout specified by the log id
router.get("/:id", function(req, res){
	var data = req.params.id;
	//console.log(data); <---here for testing purposes
	Log
	.findOne({
		where: {id: data}
	}).then(
		function getSuccess(updateData){
			res.json(updateData);
		},
		function getError(err){
			res.send(500, err.message);
		}
	);
});

//This will return data from the log that was updated
router.put("/", function(req, res){
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def;
	console.log(req);

	Log
		.update(
		{
			description: description,
			result: result,
			def: definition
		},
		{where: {id: data}}
		).then(
			function updateSuccess(updatedLog){
				res.json(updatedLog);
			},
			function updateError(err){
				res.send(500, err.message);
			}
		)
});

router.delete("/", function(req, res){
	var data = req.body.log.id;
	Log
	.destroy({
		where: {id: data}
	}).then(
		function deleteLogSuccess(data){
		res.send("You removed a log.");
		},
		function deleteLogError(err){
		res.send(500, err.message);
		}
	)
});

module.exports = router;