const Auth = require('../utils/Auth');

const requiredAuth = (req,res,next) =>{
	const {authorization} = req.headers;
	const userid = Auth.verifyToken(authorization)
	if(userid){
		req.userid = userid;
		return next();
	}
				
	return res.status(401).json("Not authorized")
}

module.exports = requiredAuth;