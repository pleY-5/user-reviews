const express = require('express');
const redis = require('redis');

const router = express.Router();
const ctrl = require('../controllers/pgReviews.js');

const { REDIS_PORT } = process.env;

const { fetch } = require('../controllers/pgReviews');

const redisClient = redis.createClient(REDIS_PORT);

const cache = (req, res, next) => {
  const { nameOrId } = req.params;

  redisClient.get(nameOrId, (err, data) => {
    if (err) {
      throw err;
    }

    if (data !== null) {
      fetch(req, res);
    } else {
      next();
    }
  });
};

router.get('/:nameOrId', cache, ctrl.fetch);
router.post('/', ctrl.add);

// router.delete("/:id", ctrl.remove);
// router.put('/:id', ctrl.update);

module.exports = router;
