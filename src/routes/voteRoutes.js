const express = require("express");
const { voteActor } = require("../controllers/voteController");
const validateVote  = require("../validators/voteValidators");
const router = express.Router();

router.post("/:id", validateVote, voteActor);

module.exports = router;