const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

const actorRoutes = require("./routes/actorRoutes");
app.use("/api/actors", actorRoutes);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then( () => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        })
    })
    .catch( (err) => console.log("❌ MongoDB Connection Error:", err));
