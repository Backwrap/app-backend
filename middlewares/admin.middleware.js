/*jshint esversion: 6 */
//authentication middleware for admin

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const adminAuth = (req, res, next)=>{
    const token = req.header("x-auth-token").split(" ")[1];
    if(!token){
        return res.status(401).send({message: 'No auth token, access denied'});
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        return res.status(401).send({message: 'Token verification failed, authorization denied'});
    }
    req.user = verified.id;
    req.token = token;
    
    userModel.findById(req.user, (err, user)=>{
        if(err){
           return  res.status(500).send({error: err.message});
        }else{
           if(user){
                if(user.type == 'user'){
                     return res.status(401).send({error: 'Unauthorized'});
                }else if(user.type == 'admin'){
                     res.json({message: 'Authorized'});

                }
           }
        }
    });
    next();
};

module.exports = adminAuth;