const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login.ejs',{
        path : '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
};

exports.postLogin = (req, res, next) => {
    User.findById('5e985e6a9ebefa371c50e743')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}