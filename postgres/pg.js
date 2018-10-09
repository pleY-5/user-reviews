require('dotenv').config();
const pg = require('pg');

const client = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'yelp',
});

client.connect((err) => {
  if (err) {
    return console.error('connection error', err.stack);
  }
  console.log('connected to postgres');
});

module.exports = {
  client,
};
