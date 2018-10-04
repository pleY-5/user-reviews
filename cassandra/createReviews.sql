CREATE TABLE reviews_by_id(
  review_id int,
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
  review text,
  PRIMARY KEY (restaurant_id, review_id)
);

CREATE TABLE reviews_by_name(
  restaurant_name text,
  review_id int,
  restaurant_id int,
  user_id int,
  date text,
  count_star_ratings int,
  count_checkin int,
  ratings int,
  useful_count int,
  funny_count int,
  cool_count int,
  reviews_count int,
  review text,
  PRIMARY KEY (restaurant_name, review_id)
);