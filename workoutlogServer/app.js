//In short, the two below lines create an express application:
var express = require("express");  //require("express") requires the node package, express.
var app = express();	//app object (from express package) is defined by express() as a function.
var bodyParser = require("body-parser");

app.use(require("./middleware/headers"));	//app.use is used to setup the specified middleware. The require 
									//callback function grabs "./middleware/headers" (js file path). ^^^^^

app.use("/api/test", function(req, res){	//app.use assigns "api/test" path, function with request, respond
	res.send("Hello World!");		//parameters responds back with the send event.. "Hello World!"
});


var Sequelize = require("sequelize"); //Creates Sequelize application.
var sequelize = new Sequelize("workoutlog", "postgres", "Bizarre1Postgres5511", { //Sequelize constructor takes all three params
	host: "localhost",		//Defines host as local host
	dialect: "postgres"		//Defines dialect as Postgres
});

sequelize.authenticate().then( //Require sequelize authentication, .then says what to do next
	function(){
		console.log("Connected to the workoutlog postgres db"); //print this string to the console if successful
	},
	function(err){
		console.log(err);		//print an error to the console if unsuccessful
	}
);


//Below is a user model in Sequelize
var User = sequelize.define("user", {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

User.sync(); //This creates the table in Postgres, matches the model we defined, & doesn't drop the db

//*******************************
// DANGER! THIS WILL DROP (DELETE) THE USER TABLE! 
//User.sync({ force: true}) <-- this drops the table completely
//*******************************

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





app.listen(3000, function(){	//app object can now start a UNIX socket (two-way communication), setting up on
	console.log("app is listening on port 3000");	//port 3000, which in this line, will print to the console.
});





