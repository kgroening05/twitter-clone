const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comments = new Schema({
    text: { type: String, required: true, maxLength: 160, minLength: 5 },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    onPost: { type: Schema.Types.ObjectId, ref: 'posts', require: true },
},{
    collection: 'comments',
    timestamps: true,
});

module.exports = mongoose.model('comment', comments);
