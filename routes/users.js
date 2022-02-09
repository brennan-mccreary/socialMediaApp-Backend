//Import dependencies
const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const { User, validateUser } = require('../models/user'); //User model and validation
const auth = require('../middleware/auth'); //JWT presence confirmation middleware

//Define router
const router = express.Router();

//Endpoints and handlers

//Exports
module.exports = router;