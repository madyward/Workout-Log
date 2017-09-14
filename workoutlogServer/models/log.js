//build a model in sequelize
module.exports = function(sequelize, DataTypes){
	return sequelize.define("log", {
		desc: DataTypes.STRING,
		result: DataTypes.STRING,
		owner: DataTypes.INTEGER,
		def: DataTypes.STRING
	},{

	});
};