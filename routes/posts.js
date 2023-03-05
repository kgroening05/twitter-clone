const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

// Controllers
const Posts = require('../controllers/posts')
const Comments = require('../controllers/comments')

// Get routes
router.get(
    '/',
    Posts.getAllPosts,
    (req, res) => {
        const posts = res.locals.posts;
        res.json({ posts })
    }
)

router.get(
    '/comments',
    Comments.getAllPostComments,
    (req, res) => {
        console.log('Getting all comments for post');
        const comments = res.locals.comments
        res.json({ comments })
    }
)

// Post routes
router.post(
    '/new-post',
    verifyToken,
    Posts.addNewPost,
    (req, res) => {
        console.log(`Added post ${req.body.title}`)
        res.json({ message: `Added post ${req.body.title}`})
    }
)

router.post(
    '/new-comment',
    verifyToken,
    Comments.addNewComment,
    (req,res)=>{
        console.log('new comment added')
        res.send({ message: 'comment successful'})
    }
)

module.exports = router;