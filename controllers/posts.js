const Post = require('../models/posts');

exports.getAllPosts = async(req, res, next) => {
    console.log('Getting all posts');
    const results = await Post
        .find({ })
        .sort({ timestamp: 'desc' })
        .limit(15)
        .populate('author');
    //console.log(results)
    res.locals.posts = results
    next()
}

exports.addNewPost = async(req,res,next) => {
    console.log(req.user)
    Post.create({
        body: req.body.tweet,
        author: req.user._id,
    })
    next()
}
