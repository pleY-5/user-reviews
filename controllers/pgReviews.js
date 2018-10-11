const redis = require('redis');
const { client } = require('../postgres/pg');

const { REDIS_PORT } = process.env;
const { REDIS_URL } = process.env;

const redisClient = redis.createClient(REDIS_PORT, REDIS_URL);

const parseResponse = (reviews) => {
  return reviews.map((review) => {
    return {
      name: review.restaurant_name,
      restaurantId: review.restaurant_id,
      ratings: review.ratings,
      reviewsCount: review.reviews_count,
      useful_count: review.useful_count,
      funny_count: review.funny_count,
      cool_count: review.cool_count,
      useful_clicked: review.useful_clicked,
      funny_clicked: review.funny_clicked,
      cool_clicked: review.cool_clicked,
      review: {
        count_starRatings: review.count_star_ratings,
        date: review.date,
        text_review: review.review,
        count_checkin: review.count_checkin,
        user: {
          name: review.user_name,
          city: review.city,
          profile_image: review.profile_image,
          count_friends: review.count_friends,
          count_reviews: review.count_reviews,
          count_photos: review.count_photos,
        },
      },
    };
  });
};

const cache = (req, res, next) => {
  const { nameOrId } = req.params;

  redisClient.get(nameOrId, (err, data) => {
    if (err) {
      throw err;
    }

    if (data !== null) {
      res.send(parseResponse(JSON.parse(data)));
    } else {
      next();
    }
  });
};

const requestById = (id, cb, res) => {
  const query = `SELECT  * FROM
  (SELECT * FROM reviews WHERE restaurant_id = ${id}) a
  INNER JOIN
  (SELECT * FROM users) b
  ON a.user_id = b.user_id;
  `;

  client.query(query)
    .then(data => {
      res.send(cb(data.rows))
      return data;
    })
    .then(data => redisClient.set(id, JSON.stringify(data.rows), 'EX', 10))
    .catch(err => console.error(err));
};

const requestByName = (name, cb, res) => {
  const query = `SELECT  * FROM
  (SELECT * FROM reviews WHERE restaurant_name = '${name}') a
  INNER JOIN
  (SELECT * FROM users) b
  ON a.user_id = b.user_id;
  `;

  client.query(query)
    .then(data => {
      res.send(cb(data.rows))
      return data;
    })
    // .then(data => redisClient.set(name, JSON.stringify(data.rows), redis.print))
    .catch(err => console.error(err));
};

const addReview = (review, res) => {
  const query = `INSERT INTO reviews(restaurant_id,restaurant_name,user_id,date,count_star_ratings,count_checkin,ratings,useful_count,funny_count,cool_count,reviews_count,useful_clicked,funny_clicked,cool_clicked,review) 
  VALUES (${review.restaurantId}, '${review.name}', ${review.user_id}, '${review.date}', ${review.count_starRatings}, ${review.count_checkin}, ${review.ratings}, ${review.useful_count}, ${review.funny_count}, ${review.cool_count}, ${review.reviewsCount}, ${review.useful_clicked}, ${review.funny_clicked}, ${review.cool_clicked}, '${review.text_review}');`;

  client.query(query)
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err));
};

const fetch = (req, res) => {
  const { nameOrId } = req.params;

  if (!isNaN(nameOrId)) {
    requestById(nameOrId, parseResponse, res);
  } else {
    const uppercaseName = nameOrId[0].toUpperCase() + nameOrId[1]
    + nameOrId[2].toUpperCase() + nameOrId.slice(3, nameOrId.length);
    requestByName(uppercaseName, parseResponse, res);
  }
};

const add = (req, res) => {
  const review = req.body;
  addReview(review, res);
};

module.exports = { fetch, add, cache };
