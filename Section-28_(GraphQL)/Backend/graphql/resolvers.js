const User = require('../models/user');
const bcrypt = require("bcryptjs");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');


module.exports = {
    createUser : async function( { userInput }, req){
        //const email = userInput.email;
        console.log('I am here');
        const errors = [];
        if(!validator.isEmail(userInput.email)){
            errors.push({message : 'Email is invalid'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min : 5})){
            errors.push({message : 'Password too short'});
        }
        if(errors.length > 0){
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({email : userInput.email});
        if(existingUser){
            const error = new Error('User already exist');
            throw error;
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email : userInput.email,
            name : userInput.name,
            password : hashedPassword
        });
        const createdUser = await user.save();
        return {...createdUser._doc, _id : createdUser._id.toString()}
    },

    login : async function({email, password}){
        const user = await User.findOne({email : email});
        if(!user){
            const error = new Error('user not found');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            const error = new Error('Passowors is incorrect');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId : user._id.toString(),
                email : user.email
            },
            'supersecret', 
            {
                expiresIn : '1hr'
            }
        );

        return {
            token : token,
            userId : user._id.toString()
        };
    },

    createPost : async function({postInput}, req){
        if(!req.isAuth){
            const error = new Error('Not Authenticated');
            error.code = 401;
            throw error;
        }
        const errors = [];
        if(validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min : 5})){
            errors.push({message : 'Title Invalid'});
        }
        if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 5 })) {
            errors.push({ message: 'Content Invalid' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('Invalid user');
            error.code = 401;
            throw error;
        }
        const post = new Post({
            title : postInput.title,
            content : postInput.content,
            imageUrl : postInput.imageUrl,
            creator : user
        });
        const createdPost = await post.save();
        // Add post to user's post
        user.posts.push(createdPost);
        await user.save();
        return { 
            ...createdPost._doc,
            id : createdPost._id.toString(),
            createdAt : createdPost.createdAt.toISOString(),
            updatedAt : createdPost.updatedAt.toISOString()
        };
    }
}