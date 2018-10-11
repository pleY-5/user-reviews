const express = require('express');

const router = express.Router();
const { cache, fetch, add } = require('../controllers/pgReviews.js');


// router.get('/:nameOrId', cache, fetch);
router.get('/:nameOrId', fetch);
router.post('/', add);

// router.delete("/:id", ctrl.remove);
// router.put('/:id', ctrl.update);

module.exports = { router };
