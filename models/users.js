const mongoose = require('mongoose');
const Schema = mongoose.Schema

const users = new Schema({
    username: { type: String, unique: true },
    password: { type: String, },
    email: { type: String, required: true },
    googleID : { type: String, },
    role: { type: String, enum: ['admin','user','poster'], default: 'user' },
    follows: { type: [Schema.Types.ObjectId], default: [], },
    followers: { type: [Schema.Types.ObjectId], default: [], },
},{
    collection: 'users',
    timestamps: true,
});

module.exports = mongoose.model('User', users);
