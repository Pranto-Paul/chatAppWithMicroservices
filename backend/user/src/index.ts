import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectRabbitMQ from "./config/rabitmq.js";
import connectRedis from "./config/redis.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (_req, res) => res.send("✅ Server is running..."));
app.use("/api/v1", userRoutes);

async function init() {
  try {
    await connectDB();
    await connectRabbitMQ();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1); // exit the process on fatal error
  }
}

init();
