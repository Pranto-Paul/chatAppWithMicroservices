import { createClient } from "redis";

const connectRedis = async () => {
  try {
    const redisClient = createClient({
      url: process.env.REDIS_URI!,
    });

    redisClient.on("error", (err) => console.error("❌ Redis error:", err));

    await redisClient.connect();
    console.log("✅ Redis connected");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
    throw error;
  }
};

export default connectRedis;
