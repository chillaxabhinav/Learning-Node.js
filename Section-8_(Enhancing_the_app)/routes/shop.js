const path = require('path');

const express = require('../node_modules/express');

const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.getProducts);


module.exports = router;