const mongoose = require("mongoose");

const PlannedworkoutSchema = new mongoose.Schema({
  userId: String,
  workoutBuddy: String,
  time: String,
  routine: String,
  notes: String,
});

// compile model from schema
module.exports = mongoose.model("plannedworkout", PlannedworkoutSchema);