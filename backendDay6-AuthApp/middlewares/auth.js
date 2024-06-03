
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try{
        // extract JWT Token
        // panding other feth data
        const token = res.body.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token messing"
            })
        }

        // verify the  token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch(error){
           return res.status(401).json({
            success:false,
            message: 'token is invalid',
           });
        } 
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: 'Something went to wrong, while verifying the token',
        });       
    }
   
}

exports.isStudent = (req, res, next) =>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message: 'This is Protected route for Student',
            })
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        });
    }
}

exports.isAdmin = (req, res, next) =>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: 'This is Protected route for Admin',
            })
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}