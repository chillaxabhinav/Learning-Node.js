const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/messages';

const app = express();

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);

app.use((error , req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message : message
    })
})

mongoose.connect(MONGODB_URI).then(result =>  app.listen(8080)).catch(err => console.log(err));