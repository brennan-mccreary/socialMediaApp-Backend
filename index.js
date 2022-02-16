//Database connection and express imports
const connectDB = require('./startup/db');
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

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

//Image collection middleware and error handling
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
// app.use((error, req, res, next) => {
//     if(req.file) {
//         fs.unlink(req.file.path, (err) => {
//             console.log(err);
//         })
//     }

//     if(res.headerSent) {
//         return next(error);
//     }

//     res.status(error.code || 500);
//     res.json({message: error.message || "An unknown error occurred."});
// });


//Back-end listener 
const port = process.env.PORT || 5003
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});