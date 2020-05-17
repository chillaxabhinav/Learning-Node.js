const  {validationResult} = require('express-validator/check');

const Post = require('../models/post');

module.exports.getPost = (req, res, next) => {
    res.status(200).json({
        posts : [
            {
                _id : '1',
                title : 'First Post',
                content : 'This is the first post !',
                imageUrl : 'images/me.jpg',
                creator : {
                    name : 'Abhinav'
                },
                createdAt : new Date()
            }
        ]
    })
}

module.exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!error){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    
    // Create Post in DB

    const post = new Post({
        title : title,
        content : content,
        imageUrl : 'images/me.jpg',
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