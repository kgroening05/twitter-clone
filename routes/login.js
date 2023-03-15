const express = require('express');
const router = express.Router();
const passport = require('../utils/passportStrategies')

require('dotenv').config()

router.get(
    '/token-check',
    (req, res) => {
        const userData = req.user
        if (userData === null){
            res.send(false)
        } else {
            res.send(userData)
        }
    }
)

router.get(
    '/google-auth',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
    '/google/redirect',
    passport.authenticate('google', { 
        failureRedirect: 'http://localhost:3000/',
        successRedirect: 'http://localhost:3000/',
    })
)

module.exports = router