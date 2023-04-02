const express = require('express');
const router = express.Router();
const passport = require('../utils/passportStrategies')

require('dotenv').config()

router.get(
    '/token-check',
    (req, res) => {
        const userData = req.user;
        if (userData === null){
            res.send({message:'no user data'})
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
        failureRedirect: `${process.env.ALLOWEDORIGIN_3}/failure`,
        successRedirect: `${process.env.ALLOWEDORIGIN_3}`,
    })
)

module.exports = router