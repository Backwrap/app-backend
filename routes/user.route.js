/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/user.controller');



router.post('/register', registerUser);
router.post('/signin', loginUser);

module.exports = router;