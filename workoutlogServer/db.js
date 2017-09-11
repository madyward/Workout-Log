var Sequelize = require("sequelize"); //By requiring Sequelize, this allows you to connect with the Sequelize database, 
																		//which creates Sql statements using JavaScript!
var sequelize = new Sequelize("workoutlog", "postgres", "Bizarre1Postgres5511", { //This line is a constructor method!
											//While line 1 ALLOWS you to connect to the Sequelize database, line 3 is the 
										//code that actually CONNECTS you. The Sequelize constructor takes all three params,
							//then...
																													
	host: "localhost",		//Defines host as local host
	dialect: "postgres"		//Defines dialect as Postgres
});

sequelize.authenticate().then( //Require sequelize authentication. Authentication returns promises, and below we have 
						//two functions that are promises. The first is if the code is executed successfully, & the second
						//is if the code is unsuccessfully ran. AND...   .then says what to do next!
	function(){
		console.log("Connected to the workoutlog postgres db"); //This string is printed to the console if successful,
	},						
	function(err){				//Or...
		console.log(err);				//An error is printed to the console if unsuccessful
	}
);



var User = sequelize.import("./models/user"); //

module.exports = sequelize; //Exporting the Sequelize database, so it can be used within the other files/folders/etc.