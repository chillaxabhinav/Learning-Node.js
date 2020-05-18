const  {validationResult} = require('express-validator/check');

const Post = require('../models/post');

module.exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200)
                .json({
                    message : 'Fetched Posts successfully',
                    posts : posts
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

module.exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;
    }

    if(!req.file){
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path.replace("\\","/");
    const title = req.body.title;
    const content = req.body.content;
    
    // Create Post in DB

    const post = new Post({
        title : title,
        content : content,
        imageUrl : imageUrl,
        creator : { name : 'Abhinav' }
    })
    post.save()
        .then(result => {
            // console.log(result);
            res.status(201).json({
                message : 'Created Post Successfully',
                post : result
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}

module.exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if(!post){
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message : 'Post Fetched',
                post : post
            });
        })
        .catch(err =>{
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}