const express = require('express');
const router = express.Router();
const passport = require('../utils/passportStrategies')

router.post(
    '/',
    (req, res, next) => {
        req.logout(err => {
            if (err) { return next (err) }
            res.status(200)
        })
    }
)

module.exports = router
