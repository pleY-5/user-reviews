const pg = require('pg');
const path = require('path');


const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'charliephan',
  password: '',
  database: 'yelp',
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
    return;
  } else {
    console.log('connected');
  }
});

module.exports = {
  client
}
