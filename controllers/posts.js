const Post = require('../models/posts');

exports.getAllPosts = async(req, res, next) => {
    console.log('Getting all posts');
    const results = await Post
        .find({ })
        .sort({ timestamp: 'desc' })
        .limit(15)
        .populate('author');
    res.locals.posts = results
    next()
}

exports.addNewPost = async(req,res,next) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        postOn: req.body.postOn,
    }, (err) => {
        if (err) {
            console.log(err)
            res.json({error: err})
        } else {
            next()
        }
    })
}
