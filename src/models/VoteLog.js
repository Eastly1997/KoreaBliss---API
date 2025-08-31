const mongoose = require("mongoose");

const voteLogSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    date: { type: String, required: true },
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model("VoteLog", voteLogSchema);