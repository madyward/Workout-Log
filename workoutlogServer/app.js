//In short, the two below lines create an express application:
var express = require("express");  //require("express") requires the node package, express.
var app = express();	//app object (from express package) is defined by express() as a function.

app.use(require("./middleware/headers"));	//app.use is used to setup the specified middleware. The require 
									//callback function grabs "./middleware/headers" (js file path). ^^^^^

app.use("/api/test", function(req, res){	//app.use assigns "api/test" path, function with request, respond
	res.send("Hello World!");		//parameters responds back with the send event.. "Hello World!"
});

app.listen(3000, function(){	//app object can now start a UNIX socket (two-way communication), setting up on
	console.log("app is listening on port 3000");	//port 3000, which in this line, will print to the console.
});