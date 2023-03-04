const Comment = require('../models/comments');

exports.getAllPostComments = async(req, res, next) => {
    const results = await Comment
        .find({ onPost: req.body.postId })
        .sort({ timestamp: 'desc' })
        .populate('author');
    res.locals.comments = results
    next()
}

exports.addNewComment = async(req,res,next) => {
    Comment.create({
        text: req.body.text,
        author: req.body.authorId,
        onPost: req.body.postId,
    }, (err) => {
        if (err) {
            console.log(err)
            res.json({error: err})
        } else {
            next()
        }
    })
}
