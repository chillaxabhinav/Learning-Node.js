const path = require('path');

const express = require('../node_modules/express');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

// As /admin part of the url is fixed/filtered in our app.js file so we don't have to repeat those

// admin/add-product ==> GET Request
router.get('/add-product', isAuth, adminController.getAddProduct);

// admin/add-product ==> POST Request
router.post('/add-product', adminController.postAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.delete('/product/:productId', adminController.deleteProduct);

module.exports = router;