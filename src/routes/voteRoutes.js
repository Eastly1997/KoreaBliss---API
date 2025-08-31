const express = require("express");
const { voteActor } = require("../controllers/voteController");
const router = express.Router();

router.post("/:id", voteActor)

module.exports = router;