module.exports = function(req, res, next){
	res.header("access-control-allow-origin", "8");
	next();
}