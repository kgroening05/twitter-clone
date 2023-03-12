const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/google', passport.authenticate('google',{
    scope: ['profile','email'],
}))

router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        //res.send('sup')
        res.redirect('http://localhost:3000/')
    },
)
module.exports = router