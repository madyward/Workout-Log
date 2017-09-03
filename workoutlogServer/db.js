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



var User = sequelize.import("./models/user");

module.exports = sequelize;