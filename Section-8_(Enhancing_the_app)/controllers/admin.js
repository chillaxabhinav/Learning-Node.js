const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, price, description);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prod: products,
            pageTitle: 'Admin Products',
            path: 'admin/products',
        });
    });
};