//In short, the two below lines create an express application:
var express = require("express");  //require("express") requires the node package, express.
var app = express();	//app object (from express package) is defined by express() as a function.
var bodyParser = require("body-parser");
var sequelize = require("./db.js");
var User = sequelize.import("./models/user");

User.sync(); //sync({ force: true }) to drop, then create again each time app starts!
app.use(bodyParser.json());

app.use(require("./middleware/headers"));	//app.use is used to setup the specified middleware. The require 
									//callback function grabs "./middleware/headers" (js file path). ^^^^^

app.use("/api/test", function(req, res){	//app.use assigns "api/test" path, function with request, respond
	res.send("Hello World!");		//parameters responds back with the send event.. "Hello World!"
});



app.listen(3000, function(){	//app object can now start a UNIX socket (two-way communication), setting up on
	console.log("app is listening on port 3000");	//port 3000, which in this line, will print to the console.
});



app.use(bodyParser.json());

app.post("/api/user", function(req, res){
	//Below, when we post to "/api/user", it'll want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password; //TODO: HASH this password. HASH means not readable by humans
	
	//Below, match the model we created above. Sequelize takes the user model and go out into the db 
	//and create this:
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		//Below, a promise is created so Sequelize will return the object it created from the user db.
		function createSuccess(user){
			res.json({
				user: user,				//<---- If successful
				message: "create"
			});
		},
		function createError(err){
			res.send(500, err.message);		//<----- If unsuccessful
		}
	);
});


