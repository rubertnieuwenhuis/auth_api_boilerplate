const User = require('../models/user')
const jwt = require('jwt-simple');
const keys = require('../config/keys');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.SECRET)
}

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'})
    }

    User.findOne({email: email}, (err, existingUser) => {
        if(err) { return next(err) }
        if(existingUser) { return res.status(422).send({error: 'email already exists'}) }
        
        const user = new User({email: email, password: password})
        user.save((err) => {
            if(err) { return next(err) }
            res.json({ token: tokenForUser(user) })
        })
    })
}

exports.signin = function(req, res, next) {
    //User already had email and password auth'd, just give a token
    res.send({ token: tokenForUser(req.user)})
}