const mongoose = require('mongoose');
const Schema = mongoose.Schema

const users = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin','user','poster'], default: 'user' },
    follows: { type: [Schema.Types.ObjectId] },
    followers: { type: [Schema.Types.ObjectId] },
},{
    collection: 'users',
    timestamps: true,
});

module.exports = mongoose.model('User', users);
