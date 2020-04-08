const path = require('path');

const express = require('express');

const router = express.Router();

const products = [];

// As /admin part of the url is fixed/filtered in our app.js file so we don't have to repeat those

// admin/add-product ==> GET Request
router.get('/add-product', (req, res, next) => {
    res.render('add-product.ejs',{
        pageTitle : 'Add Product',
        path : '/admin/add-product',
        formsCSS : true,
        productCSS : true,
        activeAddProduct : true
    });
});

// admin/add-product ==> POST Request
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

// // admin/product ==> POST Request
// router.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });




exports.products = products;
exports.routes = router;