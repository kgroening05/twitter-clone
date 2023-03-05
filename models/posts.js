const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref:"User", required : true },
    postOn: { type: Date, default: Date.now }
},{
    collection: 'posts',
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
