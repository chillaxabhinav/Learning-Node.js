const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing : false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title : title,
        price : price,
        imageURL : imageURL,
        description : description,
        userId : req.user.id
    }).then((result)=>{
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
    req.user.getProducts({where : {id : prodId}})
    .then(products => {
        const product = products[0];
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
    const updatedImageURL = req.body.imageURL;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageURL = updatedImageURL;
        return product.save();
    }).then(result => {
        console.log('Updated Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts().then(products => {
        res.render('admin/products', {
            prod: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    }).catch(err => {
        console.log(err);
    })    
};

exports.postdeleteProduct = (req, res, next) => {
    const prodID = req.body.productId;
    Product.findByPk(prodID).then(product => {
        return product.destroy();
    }).then(result => {
        console.log('Deleted Successfully');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};