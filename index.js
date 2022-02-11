//Database connection and express imports
const connectDB = require('./startup/db');
const cors = require('cors');
const express = require('express');
const app = express();

//Route imports
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');

//Connect to database
connectDB();

//Run App initialization middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

//Back-end listener 
const port = process.env.PORT || 5003
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});