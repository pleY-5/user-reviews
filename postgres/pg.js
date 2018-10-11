require('dotenv').config();
const pg = require('pg');

const client = new pg.Client({
  // host: 'ec2-34-219-27-236.us-west-2.compute.amazonaws.com',
  host: 'ec2-34-222-152-131.us-west-2.compute.amazonaws.com',
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
