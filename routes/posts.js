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

////PUT Like - post _id, user _id
router.put('/like/:id', async (req, res) => {
    try {

    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////POST New Post - user _id, text field
router.post('/post', async (req, res) => {
    try {

    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////DELETE Single post - user _id, post _id
router.delete('/delete', async (req, res) => {
    try {

    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

//Exports
module.exports = router;
