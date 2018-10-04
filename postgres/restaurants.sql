DROP TABLE restaurants;

CREATE TABLE restaurants (
    restaurant_id serial PRIMARY KEY,
    restaurant_name VARCHAR(50) UNIQUE NOT NULL
);
