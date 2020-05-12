const express = require('../node_modules/express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login',authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',authController.postLogin);

router.post('/logout', authController.postLogout);

router.post(
    '/signup',
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            // if(value === 'test@test.com'){
            //     throw new Error('Email forbidden');
            // }
            return User.findOne({email : value})
                .then(userDoc => {
                    if(userDoc){
                        return Promise.reject('Email already exist');
                    }
                })
        }),
    body('password')
        .isLength({min : 5})
        .withMessage('Please enter a password with only numbers and text and atleast 5 characters')
        .isAlphanumeric(),
    body('confirmPassword')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Password don\'t match');
            }
            return true;
        })
    ,authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;