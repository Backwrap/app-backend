/*jshint esversion: 6 */
//authentication middleware for user
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const userAuth = (req, res , next)=>{
    const token = req.header('x-auth-token').split(' ')[1];
    if(!token){
        return res.status(401).send({message: 'Access denied. No token provided', status: false});
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        return res.status(401).send({message: 'Access denied. Invalid token', status: false});
    }
    req.user = verified.id;
    req.token = token;
    next();
};


module.exports = userAuth;
