import { getLogs, updateLogLevel } from "../services/log.service.js";
import { LogLevels } from "../constants/logLevels.js";

export const fetchLogs = async (req, res) => {
  try {
    const { level, user, startTime, endTime, content } = req.query;

    const query = {};

    if (level) {
      if (!Object.values(LogLevels).includes(level)) {
        return res.status(400).json({ message: "Invalid log level" });
      }
      query.level = level;
    }

    if (user) {
      query.user = user;
    }

    if (startTime || endTime) {
      query.createdAt = {};
      if (startTime) query.createdAt.$gte = new Date(startTime);
      if (endTime) query.createdAt.$lte = new Date(endTime);
    }

    if (content) {
      query.message = new RegExp(content, "i");
    }

    const logs = await getLogs(query);
    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching logs", error: error.message });
  }
};

export const changeLogLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { level } = req.body;

    if (!Object.values(LogLevels).includes(level)) {
      return res.status(400).json({ message: "Invalid log level" });
    }

    const updatedLog = await updateLogLevel(id, level);
    if (updatedLog) {
      res
        .status(200)
        .json({ message: "Log level updated successfully", log: updatedLog });
    } else {
      res.status(404).json({ message: "Log not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating log level", error: error.message });
  }
};
