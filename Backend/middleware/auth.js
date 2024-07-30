const JWT_secret=require('../config');
const jwt=require('jsonwebtokens');

const auth=(req, res, next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith('Bearer ')){
        return res.status(403).json({success: false, "error": "user not logged in"});
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token, JWT_secret);
        if(decoded.userId){
            req.userId= decoded.userId;
            next();
        }
        else{
            return res.status(403).json({success: false, "error": "user not found"});
        }
    }
    catch(err){
        return res.status(403).json({success:false, "error": "an unforeseen error has taken place, try logging in again"})
    }
}

module.exports=auth;