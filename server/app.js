require('newrelic');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { router } = require('../routes/reviews.js');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/loaderio-3a278d8739804ff622749b1e562c836c.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'loaderio-3a278d8739804ff622749b1e562c836c.txt'));
});

app.use('/:id', express.static('./public'));
app.use('/api/reviews', router);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
