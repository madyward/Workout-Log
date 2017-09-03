//user model created using sequelize
//talks to user table

module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("user",{
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	});
	return User;
};