require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { router } = require('../routes/reviews.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/:id', express.static('./public'));
app.use('/api/reviews', router);


app.use(logger('dev'));

module.exports = { app };
