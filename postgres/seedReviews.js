const fs = require('fs');
const path = require('path');
const { client } = require('./pg');

const seedReviews = (num = 1) => {
  if (num === 51) {
    console.log('reviews table seeded');
    client.end();
    return;
  }

  const reviewPath = path.join(__dirname, '..', 'dataGeneration', 'reviews', `review${num}.csv`);

  client.query(`COPY reviews (restaurant_id,restaurant_name,user_id,date,count_star_ratings,count_checkin,ratings,useful_count,funny_count,cool_count,reviews_count,useful_clicked,funny_clicked,cool_clicked,review) FROM '${reviewPath}' DELIMITER ',' CSV HEADER`, (err, res) => {
    if (err) {
      console.error(err.stack);
      return;
    }
    console.log(`review${num}.csv seeded into database`);
    seedReviews(num + 1);
  });
}

seedReviews();