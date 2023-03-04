const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function verifyToken(req, res, next){
    const bearerHeader = req.headers.authorization;
    if (bearerHeader){
        const token = bearerHeader.split(' ')[1]
        const secret = process.env.TOKENSECRET;
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.sendStatus(403)
                return
            }
            console.log('token was good')
            req.token = decoded;
            next()
        })
    } else {
        res.sendStatus(403)
        return
    }
}