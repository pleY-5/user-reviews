DROP TABLE reviews;

CREATE TABLE reviews (
    review_id serial PRIMARY KEY,
    restaurant_id INTEGER,
    restaurant_name VARCHAR(50),
    user_id INTEGER,
    date VARCHAR(50),
    count_star_ratings INTEGER,
    count_checkin INTEGER,
    ratings INTEGER,
    useful_count INTEGER,
    funny_count INTEGER,
    cool_count INTEGER,
    useful_clicked BOOLEAN,
    funny_clicked BOOLEAN,
    cool_clicked BOOLEAN,
    reviews_count INTEGER,
    review VARCHAR(300)
);

