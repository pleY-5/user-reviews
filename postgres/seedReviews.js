const fs = require('fs');
const path
const { client } = require('./pg');

const dirPath = path.join(__dirname, '..', 'dataGeneration', 'reviews');

const seedReviews = (num = 1) => {
  if (num === 51) {
    console.log('reviews table seeded');
    client.end();
    return;
  }

  const reviewPath = path.join(__dirname, '..', 'dataGeneration', 'reviews', `review${num}.csv`);

  client.query(`COPY reviews FROM '${reviewPath}' DELIMITER ',' CSV HEADER`, (err, res) => {
    if (err) {
      console.error(err.stack);
    }
  
    console.log('done');
    seedReviews(num + 1);
  });
  
}