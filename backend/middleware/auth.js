const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifytoken = (req,res,next)=>{
    const token = req.query.token||req.headers['x-access-token']||req.body.token;
    if(!token){
        return res.status(401).send('You have to login first');
    }
    try {
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=decoded;

    } catch (error) {
        console.error("something went wrong in auth.js");
        return res.status(400).send('Invalid Token');
    }
    return next();
}

module.exports = verifytoken;
