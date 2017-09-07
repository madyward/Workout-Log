require("dotenv").config();

//In short, the two below lines create an express application:
var express = require("express");  //require("express") requires the web package application, express.
var app = express();	//app object (from express package) is defined by express() as a function.
var bodyParser = require("body-parser");
var sequelize = require("./db");
var User = sequelize.import("./models/user");


//User.sync(); //sync({ force: true }) to drop, then create again each time app starts!
//User.sync({force: true});
sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));	//app.use is used to setup the specified middleware. The require 
									//callback function grabs "./middleware/headers" (js file path). ^^^^^

app.use(require("./middleware/validate-session"));									
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

