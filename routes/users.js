const express = require('express');
const router = express.Router();

// Controllers
const Users = require('../controllers/users')

// Post routes
router.post(
    '/',
    Users.addNewUser,
    (req, res)=>{
        console.log(`User Created: ${req.body.username}`)
        res.json({ message: `created user ${req.body.username}` })
    }
);

router.put(
    '/',
    Users.updateUser,
    (req, res) => {
        console.log('updooted')
        res.send({success: true})
    }
)

module.exports = router;
