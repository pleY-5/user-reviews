const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/pgReviews.js');

router.get('/:nameOrId', ctrl.fetch);
router.post('/', ctrl.add);
// router.delete("/:id", ctrl.remove);
// router.put('/:id', ctrl.update);

module.exports = router;
