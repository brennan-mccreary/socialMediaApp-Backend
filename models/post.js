//Import dependencies
const mongoose = require('mongoose'); //db structure
const Joi = require('joi'); //validation

//Define user schema
const postSchema = new mongoose.Schema({
    text: {type: String, required: true, minlength: 1, maxlength: 500},
    ownedBy: {type: String, required: true},
    postedOn: {type: Date, default: Date.now}
});

//Create model with previously defined schema
const Post = mongoose.model('Post', postSchema);

//Joi validation
function validatePost(post) {
    const schema = Joi.object({
        text: Joi.string().min(1).max(250).required(),
        ownedBy: Joi.string().required()
    });
    return schema.validate(post);
};

//Exports
exports.Post = Post;
exports.validatePost = validatePost;