//Import dependencies
const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const { User, validateUser } = require('../models/user'); //User model and validation
const auth = require('../middleware/auth'); //JWT presence confirmation middleware
const { userInfo } = require('os');
const fileUpload = require('../middleware/file-upload');

//Define router
const router = express.Router();

//Endpoints and handlers
//GET All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
       
        return res.send(users);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//PUT About Me to User - user _id, text
router.put('/about/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                biography: req.body.biography
            },
            { new: true }
        );

        if(!user) return res.send(400).send(`User with id ${req.params.id} does not exist.`);

        await user.save();

        return res.send(user);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

//GET User's friends
router.get('/:id/friends', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.id}).populate('friends');
        let friends = user.friends  
       
        return res.send(friends);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//PUT Profile picture to User - user _id, image
router.put('/image/:id', fileUpload.single('image'), async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                image: req.file.path
            },
            { new: true }
        );

        if(!user) return res.send(400).send(`User with id ${req.params.id} does not exist.`);

        await user.save();

        return res.send(user);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

//PUT Outgoing friend request - sender _id, receiver _id
router.put('/add-friend/:from/:to', async (req, res) => {
    try{
        let user = await User.findById(req.params.to)

        user.friendRequests.push(req.params.from)

        await user.save(); 

        return res.send(user)
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

//GET Incoming friend requests - user _id
router.get('/friend-requests/:id', async (req, res) => {
    try{
        let user = await User.findOne({_id: req.params.id}).populate('friendRequests');
        let friendRequests = user.friendRequests 
       
        return res.send(friendRequests);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

//PUT Decline friend request
router.put('/:idOne/decline-friend/:idTwo', async (req, res) => {
    const user = await User.findById(req.params.idOne);

    user.friendRequests.pull(req.params.idTwo);
    await user.save();

    return res.send(user);
});

//PUT Add friend to User - user _id, friend _id
router.put('/:idOne/accept-friend/:idTwo', async (req, res) => {
    try{
        const userOne = await User.findById(req.params.idOne);
        const userTwo = await User.findById(req.params.idTwo);
        if(!userOne || !userTwo) return res.status(400).send(`User does not exist.`);
        if(userOne.friends.includes(req.params.idTwo) === true) return res.status(400).send('Users are already friends.');

        userOne.friends.push(req.params.idTwo);
        userTwo.friends.push(req.params.idOne);

        userOne.friendRequests.pull(req.params.idTwo);


        await userOne.save();
        await userTwo.save();

        return res.send(userOne);
    }
    catch(err) {
        return res.status(500).send(`Interal Server Error: ${err}`);
    }
});

//POST Register New User - user first and last name, email, password
router.post('/register', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send(`User already Registered.`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        });

        await user.save();

        const token = user.generateAuthToken();
        
        return res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({_id: user._id, firstName: user.firstName, email: user.email });

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//Exports
module.exports = router;