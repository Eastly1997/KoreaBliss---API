const actor = require("../models/Actor");


const getActors = async (req, res) => {
    try {
        const actors = await actor.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addActor = async (req, res) => {
    try {
        const newActor = new actor(req.body);
        const savedActor = await newActor.save();
        res.status(201).json(savedActor);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { getActors, addActor };