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
    User.findById('5e985e6a9ebefa371c50e743')
        .then(user => {
            req.user = user;
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
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'Abhinav',
                    email: 'abc@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });