const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('shop/product-list.ejs', {
            prod: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index.ejs', {
            prod: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart.ejs', {
        pageTitle: 'Your Cart',
        path: '/cart',
    });
};

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/checkout.ejs', {
            prod: products,
            pageTitle: 'Checkout',
            path: '/checkout',
        });
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders.ejs', {
        pageTitle: 'Orders',
        path: '/orders',
    });
};
