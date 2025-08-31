const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");
const Actor = require("./models/Actor");
const VoteLog = require("./models/VoteLog");
const helmet = require("helmet");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();

const voteLimiter = rateLimit({
    window: 60 * 1000,
    max: 3, 
    message: { message: "Toom many request, please try again later." }
});

const actorRoutes = require("./routes/actorRoutes");
app.use("/api/actors", actorRoutes);
const voteRoutes = require("./routes/voteRoutes");
app.use("/api/vote", voteLimiter, voteRoutes);
app.use(errorHandler);

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Resetting votes for new day...");
  try {
    // Clear vote IPs from all actors
    await Actor.updateMany({}, { $set: { voteIPs: [] } });

    // Delete old vote logs (optional but keeps DB clean)
    const today = new Date().toISOString().split("T")[0];
    await VoteLog.deleteMany({ date: { $ne: today } });

    console.log("✅ Daily vote reset complete!");
  } catch (error) {
    console.error("❌ Error resetting votes:", error);
  }
});

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
