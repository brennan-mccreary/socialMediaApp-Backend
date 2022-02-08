//Database connection and express imports
const connectDB = require('./startup/db');
const express = require('express');
const app = express();

//Route imports

//Connect to database
connectDB();

//Run App initialization middleware
app.use(express.json());

//Back-end listener 
const port = process.env.PORT || 5003
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});