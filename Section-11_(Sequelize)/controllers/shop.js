const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
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
    // Product.findAll({where : {id : prodId}}).then(products => {
    //     res.render('shop/product-detail.ejs', {
    //             product: products[0],
    //             pageTitle: products[0].title,
    //             path: `/products`
    //         });
    // }).catch(err => {
    //     console.log(err);
    // }) 
    Product.findByPk(prodId)
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
    Product.findAll().then(products => {
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
    Cart.getProducts((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData : product, qty : cartProductData.qty});
                }
            }
            res.render('shop/cart.ejs', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products : cartProducts
            });
        })
    })  
};

exports.postCart = (req,res,next) => {
    const prodID = req.body.productId;
    Product.findById(prodID , (product) => {
        Cart.addProduct(prodID, product.price);
    })
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId,product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
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
