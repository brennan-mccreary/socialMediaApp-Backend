//Imports
const mongoose = require('mongoose');
const config = require('config');

//Connection function declaration
function connectDB() {
    mongoose
        .connect(
            config.get('mongoURI'),
            { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => console.log(`Could not connect to MongoDB. Error: ${err}`))
};

//Function export
module.exports = connectDB;