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
    const title = req.body.title;
    const content = req.body.content;
    
    // Create Post in DB

    res.status(201).json({
        message : 'Created post successfully',
        post : { 
            _id : new Date().toISOString(),
            title : title,
            content : content,
            creator : 
                {
                    name : 'Abhinav'
                },
            createdAt : new Date()
            }
    })
}