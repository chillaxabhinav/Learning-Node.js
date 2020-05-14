const express = require('express');

const router = express.Router();

const feedController = require('../controllers/feed');

router.get('/posts', feedController.getPost);


module.exports = router;