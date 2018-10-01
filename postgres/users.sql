DROP TABLE users;

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