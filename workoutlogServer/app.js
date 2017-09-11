require("dotenv").config(); //from the folder, node_modules/dotenv/ .... .env (env = environment) allows you to hide
							//things. Essentially, put things in an environment that makes them unaccessible, unless
							//the user has a JSON Web Token (jwt). The JWT acts as a hall pass might in a grade 
																									//school setting.

//In short, the two below lines create an express application:
var express = require("express");  //require("express") requires the web package application, express.
var app = express();	//app object (from express package) is defined by express() as a function.
var bodyParser = require("body-parser"); //body parser allows the server to find data & bring it back as json objects
var sequelize = require("./db"); 
var User = sequelize.import("./models/user");


//User.sync(); //sync({ force: true }) to drop, then create again each time app starts!
//User.sync({force: true});
sequelize.sync();
app.use(bodyParser.json());	//app.use is the configuration for express
app.use(require("./middleware/headers"));	//app.use is used to setup the specified middleware. The require 
									//callback function grabs "./middleware/headers" (js file path). ^^^^^

app.use(require("./middleware/validate-session"));	//validate-session is to validate each request								
app.use("/api/user", require("./routes/user"));
app.use("/api/login", require("./routes/session")); //login route
app.use("/api/log", require("./routes/log"));
app.use("/api/definition", require("./routes/definition"));
app.use("/api/test", function(req, res){	//app.use assigns "api/test" path, function with request, respond
	res.send("Hello World!");		//parameters responds back with the send event.. "Hello World!"
});



app.listen(3000, function(){	//app object can now start a UNIX socket (two-way communication), setting up on
	console.log("app is listening on port 3000");	//port 3000, which in this line, will print to the console.
});


//********************************************************
//*** NOTE: Express is most often seen in the Server   *** 
//*** side,but it can also be used on the Client side! ***
//*** In your package.json file on the the Client side,***
//*** you list "...../http-server" in "start" under    ***
//*** "scripts".									   ***
//********************************************************