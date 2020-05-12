const Product = require('../models/product');
const mongodb = require('mongodb');

const ObjectId= mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing : false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    
    if(!image){
        return res.status(422).render('admin/edit-product.ejs', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
        });
    }

    const imageURL = image.path;
    const product = new Product({
        title : title,
        imageURL : imageURL,
        price : price,
        description : description,
        userId : req.user._id
    });
    product.save().then((result)=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    
    Product.findById(prodId)
    .then(product => {
        if( !product ){
            return redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }).catch(err => {
        console.log(err);
    });    
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDescription = req.body.description;

    Product.findById(prodId).then(product => {
        if(product.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        // product.imageURL = updatedImageURL;
        product.description = updatedDescription;
        if(image){
            product.imageURL = image.path;
        }
        return product.save().then(result =>{
            console.log('Updated Product');
            res.redirect('/admin/products');
        });  
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    Product.find({userId : req.user._id})
        .then(products => {
            res.render('admin/products', {
                prod: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postdeleteProduct = (req, res, next) => {
    const prodID = req.body.productId;
    Product.deleteOne({_id : prodID, userId : req.user._id}).then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};