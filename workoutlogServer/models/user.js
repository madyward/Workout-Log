//user model created using sequelize
//talks to user table

module.exports = function(sequelize, DataTypes){ //You can add in more information to be returned in the Sequelize 
										//Database. It's not limited to just the username & password. For example:
										//If you add a profile page to your website, you could add information to
										//be stored/retrieved for that. Or add the date a user signed up, or last
										//logged in... or created/updated a workout... etc.
	return sequelize.define("user",{
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
		//Can add on: firstName: DataTypes.STRING;
	});
	return User;
};

//In Postgres (PostgreSql), there are ORMs (columns for your database) that are already built in. These are:
//																- id (integer)
//																- username
//																- passwordhash
//																- createdAt
//																- updatedAt