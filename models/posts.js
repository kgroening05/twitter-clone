const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref:"users", required : true },
    postOn: { type: Date, default: Date.now }
},{
    collection: 'posts',
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
