const Actor = require("../models/Actor");

const voteActor = async (req, res) => {
    try {
        const { ip } = req.ip;

        const actor = await Actor.findById(req.params.id);

        if(!actor) {
            return res.status(404).json({message: "Actor not found" });
        }

        if(!actor.voteIPs) {
            actor.voteIPs = [];
        }

        if(actor.voteIPs.includes(ip)) {
            return res.status(429).json({ message: "You already voted for this actor. "});
        }

        actor.votes += 1;
        actor.voteIPs.push(ip);
        await actor.save();

        res.status(200).json({
            message: "Vote counted successfully!", 
            actor
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { voteActor };