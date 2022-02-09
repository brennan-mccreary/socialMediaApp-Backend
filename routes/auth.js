//Import dependencies
const express = require('express'); //Request routing
const Joi = require('joi'); //Validation
const bcrypt = require('bcrypt'); //Password hashing
const { User } = require('../models/user'); //User model and validation

//Define router
const router = express.Router();

//Endpoints and handlers
////Login route/handler
router.post('/', async (req, res) => {
    try {
        //Reject login if email or password do not pass joi validation
        const { error } = validateLogin(req.body);
        if(error) {return res.status(400).send(error.details[0].message)};

        //Check to see if user exists based on email
        let user = await User.findOne({ email: req.body.email });
        if(!user) {return res.status(400).send('Invalid email or password.')}; //reject login if no matching email found

        //Hash input and check against registered hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password); 
        if(!validPassword) {return res.status(400).send('Invalid email or password.')}; //reject login if password does not match

        //Generate JWT
        const token = user.generateAuthToken();
        
        return res.send(token);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});

//Joi validation
function validateLogin(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });
    return schema.validate(req);
};

//Exports
module.exports = router;