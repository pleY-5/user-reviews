const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviews.js");

router.get("/:nameOrId", ctrl.fetch);
router.post("/", ctrl.add);
router.delete("/:id", ctrl.remove);
router.put('/:id', ctrl.update);

module.exports = router;
