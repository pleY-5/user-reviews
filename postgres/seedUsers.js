const path = require('path');


const usersPath = path.join(__dirname, '..', 'dataGeneration', 'users', 'user.csv');

client.query(`COPY users FROM '${usersPath}' DELIMITER ',' CSV HEADER`, (err, res) => {
  if (err) {
    console.error(err.stack);
  }

  console.log('users tabled seeded');
  client.end();
});