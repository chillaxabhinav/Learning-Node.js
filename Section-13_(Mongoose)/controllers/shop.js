const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list.ejs', {
            prod: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-detail.ejs', {
                product: product,
                pageTitle: product.title,
                path: `/products`
            });
        })
        .catch(err => {
            console.log(err);
        });  
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index.ejs', {
            prod: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => { 
    req.user.getCart().then(products => {
            res.render('shop/cart.ejs', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products : products
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postCart = (req,res,next) => {
    const prodID = req.body.productId;
    Product.findById(prodID)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('./cart');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};



exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders.ejs', {
                pageTitle: 'Orders',
                path: '/orders',
                orders : orders
            });
        })
        .catch(err =>{
            console.log(err);
        })
    
};

exports.postOrder = (req,res,next) => {
    req.user
        .addOrder()
        .then(result =>{
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        })
}
