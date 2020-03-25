const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('THIS IS MY FIRST MIDDLEWARE');
    next();
});

app.use((req,res,next) => {
    console.log('THIS IS MY SECOND MIDDLEWARE');
})


const server = http.createServer(app);

server.listen(3000);