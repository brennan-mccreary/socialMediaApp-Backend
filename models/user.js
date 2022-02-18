//Import dependencies
const mongoose = require('mongoose'); //db structure
const Joi = require('joi'); //validation
const config = require('config'); //secure variables
const jwt = require('jsonwebtoken'); //user verification


//Define user schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 1, maxlength: 20},
    lastName: {type: String, required: true, minlength: 1, maxlength: 20},
    email: {type: String, unique: true, required: true, minlength: 5, maxlength: 255},
    password: {type: String, required: true, minlength: 6, maxlength: 255},

    biography: {type: String, maxlength: 500, default:''},

    friends: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    friendRequests: [{type: mongoose.Types.ObjectId, ref: 'User'}],

    isAdmin: {type: Boolean, default: false},

    image: {type: String, default: ''},
});

//JWT assignment method
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ 
        _id: this._id, 
        firstName: this.firstName, 
        lastName: this.lastName, 
        isAdmin: this.isAdmin,
        image: this.image,
    },
    config.get('jwtSecret'));
};

//Create model with previously defined schema
const User = mongoose.model('User', userSchema);

//Joi validation
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        image: Joi.string(),
    });
    return schema.validate(user);
};

//Exports
exports.User = User;
exports.validateUser = validateUser;