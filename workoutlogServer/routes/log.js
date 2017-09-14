var router = require("express").Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var User = sequelize.import("../models/user");
var Definition = sequelize.import("../models/definition");

router.post("/", function(req, res){
	/*req has some body properties that have a username and password*/
	console.log(req.body);
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;

	/*Use sequelize model to create log*/
	Log
	.create({
		desc: description,
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
	.findAll({	//findAll is another SQL query. findAll responds w/ all data for that user's id
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

/*Retrieve one workout specified by the log id*/
router.get("/:id", function(req, res){	//Sends a get request to the specific location ("/:id")
	var data = req.params.id;
	//console.log(data); <---here for testing purposes
	Log
	.findOne({	//Find one specific object in database that matches the ID
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

/*Return data from the log that was updated*/
router.put("/", function(req, res){	//.put returns all data from the specific log that was updated
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var data = req.body.log.id;
	var definition = req.body.log.def;
	console.log(req);

	Log
		.update( //.update is another SQL query. It takes two arguements 
		{
			description: description,
			result: result,									//Argument #1
			def: definition
		},
		{where: {id: data}}									//Argument #2

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