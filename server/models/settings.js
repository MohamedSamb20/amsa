const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: String,
  weightUnit: String,
  heightUnit: String,
  height: Number|| String,
  weight: Number,
  height1: Number|| String,
  height2: Number || String,
  weightHistory: [[String|Number]],
});

// compile model from schema
module.exports = mongoose.model("setting", SettingsSchema);