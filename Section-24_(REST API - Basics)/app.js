const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feedRoutes = require('./routes/feed');

app.use(bodyParser.json());

app.use('/feed', feedRoutes);

app.listen(8080);