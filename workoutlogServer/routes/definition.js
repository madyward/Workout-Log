var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var Definition = sequelize.import("../models/definition");

router.post("/", function(req, res){
	/*Variables*/
	var description = req.body.definition.desc;
	var logType = req.body.definition.type;
	var owner = req.user.id;

	/*Methods*/
	Definition
	/*Objects must match model*/
	.create({
		description: description,
		logType: logType,
		owner: owner
	})
	.then(
		/*createSuccess function*/
		function createSuccess(definition){
			//send response as json
			res.json({
				definition: definition
			});
		},

		/*createError function*/
		function createError(err){
			res.send(500, err.message);
		}
	);
});

router.get("/", function(req, res){ 
	/*user variable*/
	var userid = req.user.id;

	Definition
	/*findAll by owner method*/
	.findAll({
		where: {owner: userid}
	})
	.then(
		/*Success*/
		function findAllSuccess(data){
			//console.log(data);
			res.json(data);
		},

		/*Error*/
		function findAllError(err){
			res.send(500, err.message);
		}
	);

});


module.exports = router;