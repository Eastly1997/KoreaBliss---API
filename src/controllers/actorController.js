const Actor = require("../models/Actor");

const getActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addActor = async (req, res) => {
    try {
        const newActor = new Actor(req.body);
        const savedActor = await newActor.save();
        res.status(201).json(savedActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateActor = async (req, res) => {
    try {
        const { name, imageUrl, description } = req.body;
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }

        actor.name = name || actor.name;
        actor.imageUrl = imageUrl || actor.imageUrl;
        actor.description = description || actor.description;
        const updatedActor = await actor.save();

        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }

        await actor.deleteOne();
        res.status(204).json({ message: "Actor removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getActors, getActorById, addActor, updateActor, deleteActor };