const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('This is my middleware');
    res.send('<h1>Send from express js</h1>');
});


module.exports = router;