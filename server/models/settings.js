const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: String,
  weightUnit: String,
  heightUnit: String,
  height: Number,
  weight: Number,
  weightHistory: [[String|Number]],
});

// compile model from schema
module.exports = mongoose.model("setting", SettingsSchema);