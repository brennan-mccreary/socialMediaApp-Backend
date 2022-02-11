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

router.post('/register', async (req, res) => {
    try {
        const { error } = validateUser(req.body);

        if (error) return res.status(400).send(error.details[0].messsage);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send(`User already Registered.`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            passsword: await bcrypt.hash(req.body.password, salt),

        });

        await user.save();

        const token = user.generateAuthToken();
        
        return res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({_id: user._id, name: user.name, email: user.email });

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
//Exports
module.exports = router;