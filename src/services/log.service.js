import Log from "../models/logModel.js";

export const logInfo = async (user, message, additionalInfo = {}) => {
  await Log.create({ level: "info", user, message, additionalInfo });
};

export const logWarning = async (user, message, additionalInfo = {}) => {
  await Log.create({ level: "warning", user, message, additionalInfo });
};

export const logError = async (user, message, additionalInfo = {}) => {
  await Log.create({ level: "error", user, message, additionalInfo });
};

export const updateLogLevel = async (id, level) => {
  try {
    const log = await Log.findByIdAndUpdate(id, { level }, { new: true });
    return log;
  } catch (error) {
    throw new Error("Error updating log level: " + error.message);
  }
};

export const getLogs = async (query) => {
  try {
    const logs = await Log.find(query);
    return logs;
  } catch (error) {
    throw new Error("Error fetching logs: " + error.message);
  }
};
