/*jshint esversion: 6 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
        trim: true
    },
    lastName :{
        type: String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate:{
            validator: (value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please enter a valid email address',
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: (value)=>{
            return value.length >= 8;
        },
        message: 'Password must be at least 8 characters long',
    },
    type: {
        type: String,
        default: 'user',
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;