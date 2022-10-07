/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/user.controller');



router.post('/api/signup', registerUser);

module.exports = router;