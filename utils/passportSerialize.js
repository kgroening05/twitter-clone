const User = require('../models/users');

exports.serializeUser =(user, done) => {
    console.log('serialize')
    done(null, user.id);
}

exports.deserializeUser = async (id, done) => {
    console.log('deserialize')
    const user = await User.findById(id).exec();
    done(null, user);
}