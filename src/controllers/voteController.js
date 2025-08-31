const Actor = require("../models/Actor");
const VoteLog = require("../models/VoteLog");

const voteActor = async (req, res) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const today = new Date().toISOString().split("T")[0];

        const DAILY_LIMIT = 1 // ✅ Set daily vote limit here

        const actor = await Actor.findById(req.params.id);

        if(!actor) {
            return res.status(404).json({message: "Actor not found" });
        }

        if(actor.voteIPs.includes(ip)) {
            return res.status(429).json({ message: "You already voted for this actor. "});
        }

        let voteLog = await VoteLog.findOne({ ip, date: today });

        if (!voteLog) {
            voteLog = new VoteLog({ ip,date: today,count: 0 });
        }

        if (voteLog.count >= DAILY_LIMIT) {
            return res.status(429).json({ message: "Daily vote limit reached" });
        }

        actor.votes += 1;
        actor.voteIPs.push(ip);
        await actor.save();

        voteLog.count += 1;
        await voteLog.save();

        res.status(200).json({
            message: "Vote counted successfully!", 
            actor
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { voteActor };