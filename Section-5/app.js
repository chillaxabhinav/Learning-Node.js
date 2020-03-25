const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('THIS IS MY FIRST MIDDLEWARE');
    next(); // Allow us to continue/jump to next middleware present
});

app.use((req,res,next) => {
    console.log('THIS IS MY SECOND MIDDLEWARE');
    res.send('<h1>Send from express js</h1>');
})


// Below my() function is also my middleware function
// so every use() method is treated as middleware and next() method get us to the next use() method defined
// function my(req,res,next){
//     console.log('will this work ?');
//     res.send('<h1>Send from express js</h1>');
// }
// app.use(my);


const server = http.createServer(app);

server.listen(3000);