import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["Error", "Warning", "Info"],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
