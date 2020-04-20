const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login.ejs',{
        path : '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => { 
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email : email})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup');
            }
            const user = new User({
                email : email,
                password : password,
                cart : {items : []}
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogin = (req, res, next) => {
    User.findById('5e985e6a9ebefa371c50e743')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};