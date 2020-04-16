const path = require('path');

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const User = require('./models/user.js');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findById('5e96ec2f73f5821d74edf0ac')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use('/',errorController.get404Page);

mongoose.connect('mongodb://localhost:27017')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });