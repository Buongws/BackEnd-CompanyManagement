import Log from "../models/logModel.js";

const loggingMiddleware = (req, res, next) => {
  const requestTime = new Date().toISOString();
  // Log information about incoming requests
  const logInfo = async (message, level = "Info", additionalInfo = {}) => {
    const logEntry = new Log({
      level,
      user: req.user?.username || "Unknown",
      message,
      createdAt: requestTime,
      additionalInfo,
    });
    await logEntry.save();
  };

  logInfo(`Request: ${req.method} ${req.originalUrl}`, "Info", {
    query: req.query,
    body: req.body,
  });

  next();

  res.on("finish", () => {
    const responseTime = new Date().toISOString();

    if (res.statusCode >= 400 && res.statusCode < 500) {
      // Log warning for client errors (e.g., invalid input)
      logInfo(
        `Response: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
        "Warning",
        {
          body: req.body,
          responseTime,
        }
      );
    } else if (res.statusCode >= 500) {
      // Log error for server errors
      logInfo(
        `Response: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
        "Error",
        {
          body: req.body,
          responseTime,
        }
      );
    } else {
      logInfo(
        `Response: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
        "Info",
        {
          responseTime,
          statusCode: res.statusCode,
        }
      );
    }
  });
};

const errorLoggingMiddleware = (err, req, res, next) => {
  const errorTime = new Date().toISOString();

  const logError = async (message, level = "Error", additionalInfo = {}) => {
    const logEntry = new Log({
      level,
      user: req.user?.username || "Unknown",
      message,
      createdAt: errorTime,
      additionalInfo,
    });
    await logEntry.save();
  };

  logError(`Error occurred`, "Error", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    statusCode: err.status || 500,
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  if (process.env.NODE_ENV === "development") {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      statusCode: err.status || 500,
    });
  } else {
    res.status(err.status || 500).json({
      message: "Internal Server Error",
    });
  }
};

export { loggingMiddleware, errorLoggingMiddleware };
