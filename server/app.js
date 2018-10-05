const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('../routes/reviews.js');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3002',
  optionsSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/:id', express.static('./public'));

app.use('/api/reviews', cors(corsOptions), routes);


app.use(logger('dev'));

module.exports = app;

// app.use('/reviews', cors(corsOptions), routes);
