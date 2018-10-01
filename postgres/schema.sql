DROP TABLE reviews;
DROP TABLE users;
DROP TABLE restaurants;

CREATE TABLE restaurants (
    restaurant_id serial PRIMARY KEY,
    restaurant_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    profile_image VARCHAR(100),
    count_friends INTEGER,
    count_reviews INTEGER,
    count_photos INTEGER
);

CREATE TABLE reviews (
    review_id serial PRIMARY KEY,

    restaurant_id INTEGER REFERENCES restaurants(restaurant_id),
    restaurant_name VARCHAR(50) REFERENCES restaurants(restaurant_name),
    user_id INTEGER REFERENCES users(user_id),
    
    date VARCHAR(50),
    count_star_ratings INTEGER,
    count_checkin INTEGER,
    ratings INTEGER,
    useful_count INTEGER,
    funny_count INTEGER,
    cool_count INTEGER,
    useful_clicked INTEGER,
    funny_clicked INTEGER,
    cool_clicked INTEGER,
    reviews_count INTEGER,
    review VARCHAR(300)
);

