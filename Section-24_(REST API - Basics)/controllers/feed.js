module.exports.getPost = (req, res, next) => {
    res.status(200).json({
        posts : [{title : 'First Post', content : 'This is the first post !'}]
    })
}

module.exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    
    // Create Post in DB

    res.status(201).json({
        message : 'Created post successfully',
        post : {id : new Date().toISOString(), title : title, content : content}
    })
}