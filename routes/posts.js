//Import dependencies
const express = require('express'); //Request routing
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth'); //JWT presence confirmation middleware
const { text } = require('express');

//Define router
const router = express.Router();

//Endpoints and handlers
////GET All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort( {postedOn: -1} );
        return res.send(posts);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////PUT Like - post _id, user _id
router.put('/like/:id', async (req, res) => {
    try {
       
        const post = await Post.findByIdAndUpdate(
            req.params.id, { $inc: { likeCount: 1}}, { new: true }
            
        );
       
        await post.save();

        return res.send(post);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////POST New Post - user _id, text field
router.post('/post', async (req, res) => {
    try {
    //new post validation
    //validation error handling here

    const post = new Post({
        text: req.body.text,
        ownedBy: req.body.ownedBy

    })
    await post.save();
    return res.send(post);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

////DELETE Single post - post _id
router.delete('/delete/:id', async (req, res) => {
    try {
        
            const deleted = await Post.findByIdAndDelete(req.params.id);
            const posts = await Post.find()

        return res.send(posts);

    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };

});

//Exports
module.exports = router;
