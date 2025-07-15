require("dotenv").config()

const jwt=require('jsonwebtoken');

const auth =(req,res,next)=>{
    let token;

    const authHeader=req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
    }
    else if( req.cookies && req.cookies.token){
        token=req.cookies.token;
    }

    if(!token){
        return res.status(401).json({
            message:'No token provided authorization Denied '
        });
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
};

module.exports=auth;