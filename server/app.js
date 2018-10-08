require('newrelic');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { router } = require('../routes/reviews.js');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/:id', express.static('./public'));
  app.use('/api/reviews', router);

  const PORT = process.env.PORT || 3002;

  app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
}
