const path = require('path');

const express = require('../node_modules/express');

const router = express.Router();

const adminController = require('../controllers/admin');


// As /admin part of the url is fixed/filtered in our app.js file so we don't have to repeat those

// admin/add-product ==> GET Request
// router.get('/add-product', adminController.getAddProduct);

// // admin/add-product ==> POST Request
// router.post('/add-product', adminController.postAddProduct);

// router.get('/products', adminController.getProducts);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postdeleteProduct);

module.exports = router;