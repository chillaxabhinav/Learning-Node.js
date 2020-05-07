const path = require('path');

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');
const User = require('./models/user.js');

const MONGODB_URI = 'mongodb://localhost:27017/admin';

const app = express();
const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection : 'sessions'
});

const csrfProtection = csrf();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret : 'my secret', resave : false, saveUninitialized : false, store : store}));
app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
    if(req.session.user){
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                console.log(err);
            });
    }
    else{
        next();
    }
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.use('/',errorController.get404Page);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });