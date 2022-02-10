//Import dependencies
const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const { User, validateUser } = require('../models/user'); //User model and validation
const auth = require('../middleware/auth'); //JWT presence confirmation middleware
const { userInfo } = require('os');

//Define router
const router = express.Router();

//Endpoints and handlers
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
       
        return res.send(users);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})
//Exports
module.exports = router;