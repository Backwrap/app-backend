/*jshint esversion: 9 */
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser =(req, res)=>{
    let {firstName, lastName, email, password} = req.body;
    userModel.findOne({email}, (err, user)=>{
        if(err){
           return res.status(500).send({message: 'Error occured'});
        }else{
            if(user){
                return res.status(400).send({message: 'User already exists', status: false});
            }else{
                let saltRound = 10;
                bcrypt.hash(password, saltRound, (err, hash) => {
                   if(err){
                          return res.status(500).send({message: 'Error occured'});
                   }else{
                        let user  = new userModel({firstName, lastName, email, password: hash});
                        user.save((err, user)=>{
                            if(err){
                                if ( err.message.includes( "User validation failed: email: Please enter a valid email address")){
                                    return  res.status(400).json({ message: "Email Address is not valid",status: false});
                                 } else if ( err.message.includes( "User validation failed: password: " )) {
                                     return res.status(400).json({ message: "Password must be at least 8 characters long",status: false});
                                } else {
                                return res.status(400).json({ message: "Error Occurred" });
                                }
                            }else{
                                return res.status(200).json({message: 'User registered successfully', status: true, user});
                            }
                        });
                   }
                });
            }
        }
    });
};

const loginUser = (req, res) => {
    let {email, password} = req.body;
    userModel.findOne({email}, (err, user)=>{
        if(err){
            return res.status(500).send({message: 'Error occured'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err){
                        return res.status(500).send({message: 'Error occured'});
                    }else{
                        if(result){
                            let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 300});
                            return res.status(200).send({message: 'Login successful', status: true, token, ...user._doc});
                        }else{
                            return res.status(400).send({message: 'Invalid password', status: false});
                        }
                    }
                });
            }else{
                return res.status(400).send({message: 'User does not exist', status: false});
            }
        }
    });
};

module.exports = {registerUser, loginUser};