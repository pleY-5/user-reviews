const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'yelp' });
const path = require('path');

client.connect((err) => {
  if (err) {
    console.error(err);
  }
  console.log('connected');
});

const createReviewsTable = 
`CREATE TABLE reviews(
  review_id int PRIMARY KEY,
  restaurant_id int,
  restaurant_name text,
  user_id int,
  date text,
  count_star_ratings int,
  count_checkin int,
  ratings int,
  useful_count int,
  funny_count int,
  cool_count int,
  reviews_count int,
  review text
);`;

// client.execute(createReviewsTable)
//   .then(result => console.log('table created'))
//   .catch(err => console.error(err));

// const reviewPath = path.join(__dirname, '..', 'dataGeneration', 'reviews', `review${1}.csv`);
// console.log(reviewPath);

const copyReviews = `COPY reviews (review_id, restaurant_id, restaurant_name, user_id, date, count_star_ratings, count_checkin, ratings, useful_count, funny_count, cool_count, reviews_count, review) FROM '/Users/charliephan/hackreactor/reviews1/dataGeneration/reviews/review1.csv' with HEADER=TRUE;`;

client.execute(copyReviews)
  .then(result => console.log(`seed review$1.csv`))
  .catch(err => console.error(err));

// const seedReviews = (fileNumber = 1) => {
//   if (fileNumber === 5) {
//     return;
//   }

//   const copyReviews = `COPY reviews (review_id, restaurant_id, restaurant_name, user_id, date, count_star_ratings, count_checkin, ratings, useful_count, funny_count, cool_count, reviews_count, review) FROM '/Users/charliephan/hackreactor/reviews1/dataGeneration/reviews/review${fileNumber}.csv' with HEADER=TRUE;`;

//   client.execute(copyReviews)
//     .then(result => console.log(`seed review${fileNumber}.csv`))
//     .then(seedReviews(fileNumber + 1))
//     .catch(err => console.error(err));
// }

// seedReviews();
