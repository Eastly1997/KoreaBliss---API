const mongoose = require("mongoose")

const actorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        imageUrl: { type: String },
        description: { type: String },
        votes: { type: Number, default: 0}
    }, { timestamps: true}
);

module.exports = mongoose.model("Actor", actorSchema, "kdramas");
