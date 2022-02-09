//Import dependencies
const express = require('express'); //Request routing
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth'); //JWT presence confirmation middleware

//Define router
const router = express.Router();

//Endpoints and handlers

//Exports
module.exports = router;
