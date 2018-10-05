require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('../routes/reviews.js');

const app = express();

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
