//Import dependencies
const express = require('express'); //Request routing
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth'); //JWT presence confirmation middleware

//Define router
const router = express.Router();

//Endpoints and handlers
////GET All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        return res.send(posts);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////PUT Like - post _id

////POST New Post - user _id, text field

////DELETE Single post - user _id, post _id

//Exports
module.exports = router;
