const express = require('express');
const fs = require('fs');
var path = require('path');

const app = express();

function authentication(req, res, next) {
    let authHeader = req.headers.authorization;
    console.log(req.headers);

    if(!authHeader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];

    if(user == 'admin' && pass == 'password') {
        next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}

app.use(authentication);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});