const express = require("express");
const { getActors, addActor } = require("../controllers/actorController");
const router = express.Router();

router.get("/", getActors);
router.post("/", addActor);

module.exports = router;