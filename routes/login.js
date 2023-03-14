const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');
const verifyToken = require('../utils/verifyToken')
const passport = require('../utils/passportStrategies')

require('dotenv').config()

router.get(
    '/token-check',
    (req, res) => {
        const userData = req.user
        res.json({ user: userData })
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