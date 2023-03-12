const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');
const verifyToken = require('../utils/verifyToken')
const passport = require('../utils/passportStrategies')

require('dotenv').config()

router.get(
    '/',
    verifyUser,
    (req, res) => {
        const { username } = req.body;
        const secret = process.env.TOKENSECRET;
        jwt.sign({ username }, secret, (err, token)=>{
            if (err) {
                console.log(err)
                res.json({ err });
            } else {
                res.json({ token })
            }
        })
})

router.get(
    '/token-check',
    verifyToken,
    (req, res) => {
        res.json({ token: req.token})
    }
)

router.get(
    '/google-auth',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

function verifyUser(req, res, next) {
    const { username, password } = req.body;
    if (!(username && password)) {
        console.log('missing username or password');
        res.json({ message: 'missing username or password' })
        return
    }
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ err });
            return
        } 
        if (!user) {
            console.log('bad username')
            res.json({ error: "Incorrect username" });
            return
        } 
        bcrypt.compare(password, user.password, (err, result) => {
            if (err){
                console.log(err)
                res.json({ err });
            }
            if (result) {
                // passwords match! log user in
                console.log('good password')
                next()
            } else {
                // passwords do not match!
                console.log('bad password')
                res.json({ error: "Incorrect password" });
            }
        })
    });
}

module.exports = router