//Database connection and express imports
const connectDB = require('./startup/db');
const express = require('express');
const app = express();

//Route imports
const posts = require('./routes/posts');

//Connect to database
connectDB();

//Run App initialization middleware
app.use(express.json());
app.use('/api/posts', posts)

//Back-end listener 
const port = process.env.PORT || 5003
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});