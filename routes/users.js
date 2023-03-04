const express = require('express');
const router = express.Router();

// Controllers
const Users = require('../controllers/users')

// Post routes
router.post(
    '/new-user',
    Users.addNewUser,
    (req, res)=>{
        console.log(`User Created: ${req.body.username}`)
        res.json({ message: `created user ${req.body.username}` })
    }
);

module.exports = router;
