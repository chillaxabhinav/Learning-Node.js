const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('THIS IS MY FIRST MIDDLEWARE');
    next(); // Allow us to continue/jump to next middleware present
});

app.use((req,res,next) => {
    console.log('THIS IS MY SECOND MIDDLEWARE');
    next();
})


// Below my() function is also my middleware function called in line 23
function my(){
    console.log('will this work ?');
}

app.use(my);


const server = http.createServer(app);

server.listen(3000);