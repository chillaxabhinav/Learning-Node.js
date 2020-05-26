const User = require('../models/user');
const bcrypt = require("bcryptjs");

module.exports = {
    createUser : async function( { userInput }, req){
        //const email = userInput.email;
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
    }
}