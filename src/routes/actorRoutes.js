const express = require("express");
const { getActors, addActor, getActorById, updateActor, deleteActor } = require("../controllers/actorController.js");
const router = express.Router();
const { protectAdmin } = require("../middlewares/authMiddleware.js");


router.get("/", getActors);
router.get("/:id", getActorById);

router.post("/", protectAdmin, addActor);
router.put("/:id", protectAdmin, updateActor);
router.delete("/:id", protectAdmin, deleteActor);

module.exports = router;