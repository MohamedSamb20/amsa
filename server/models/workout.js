const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  exercise: String,
  timestamp: { type: Date, default: Date.now },
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
