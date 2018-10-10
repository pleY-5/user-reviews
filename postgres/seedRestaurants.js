const { client } = require('./pg');
const path = require('path');

const restaurantsPath = path.join(__dirname, '..', 'dataGeneration', 'restaurants', 'restaurantNames.csv');

client.query(`COPY restaurants FROM '${restaurantsPath}' DELIMITER ',' CSV HEADER`, (err, res) => {
  if (err) {
    console.error(err.stack);
  }

  console.log('done');
  client.end();
});
