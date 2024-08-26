import mongoose from "mongoose";

// Create a Mongoose schema for performance logs
const performanceLogSchema = new mongoose.Schema({
  url: String,
  method: String,
  statusCode: Number,
  responseTime: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: String,
});

const PerformanceLog = mongoose.model("PerformanceLog", performanceLogSchema);

const performanceMiddleware = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on("finish", async () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    const performanceLog = new PerformanceLog({
      url: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: elapsedTimeInMs,
      timestamp: new Date().toISOString(),
      user: req.user?.username || "Unknown",
    });

    try {
      await performanceLog.save();
    } catch (error) {
      console.error("Failed to save performance log:", error.message);
    }
  });

  next();
};

export default performanceMiddleware;
