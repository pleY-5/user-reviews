require('newrelic');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { router } = require('../routes/reviews.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/:id', express.static('./public'));
app.use('/api/reviews', router);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
