const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');


// As /admin part of the url is fixed/filtered in our app.js file so we don't have to repeat those

// admin/add-product ==> GET Request
router.get('/add-product', productsController.getAddProduct);

// admin/add-product ==> POST Request
router.post('/add-product', productsController.postAddProduct);

// // admin/product ==> POST Request
// router.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });



module.exports = router;