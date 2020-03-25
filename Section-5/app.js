const http = require('http');

const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    console.log('This always runs');
    next();
});

app.use('/yupp' , (req,res,next) =>{ 
    console.log('This should not run ideally');
    next();
})

app.use('/add-product',(req,res,next)=>{
    console.log('This should run');
    res.send('<h1>This is add product url</h1>');
});

app.use('/',(req,res,next) => {
    console.log('This is my middleware');
    res.send('<h1>Send from express js</h1>');
})
app.listen(3000);
