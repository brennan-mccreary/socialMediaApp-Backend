//Import dependencies
const jwt = require('jsonwebtoken');
const config = require('config');

//Auth function
function auth(req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acess denied. No token provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        return next();
    }catch (ex) {
        return res.status(400).send('Invalid token.');
    
    }

};

//Export
module.exports = auth;