const path = require('path');

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product  = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findByPk(1)
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

Product.belongsTo(User,{constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through : OrderItem});


sequelize.sync()
    .then(result => {
        return User.findByPk(1);
        // app.listen(3000);
    })
    .then(user => {
        if(!user){
            return User.create({name : 'Abhinav',email : 'abc@gmail.com'});
        }
        return Promise.resolve(user);
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

