const User = require('../models/users');
const bcrypt = require('bcryptjs')

exports.addNewUser = async (req, res, next) => {
    if (!(req.body.password && req.body.username)){
        console.log('No password or username passed')
        res.json({ message: 'Need username and password' });
    } else {
        bcrypt.hash(req.body?.password, 10, (err, hashedPassword) => {
            if(err){
                console.log(err)
            } else {
                User.create({
                    username : req.body.username,
                    password: hashedPassword,
                },(err)=>{
                    if (err) {
                        console.log(err)
                        res.json({ error: 'that username already exists' })
                    } else {
                        next()
                    }
                })
            }
        });
    }
}

exports.updateUser = async (req, res, next) => {
    if (!req.user){
        console.log('no user object')
        return
    }
    console.log(req.body)
    const update = req.body
    const options = {
        new: true,
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, update,options)
    console.log(updatedUser)
    next()
}
