// import exercise from "./exercise";
// import ExerciseSchema from ../models/exercise.js
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: String,
  username: String,
  workoutType: String,
  exerciseIds: [],
  timestamp: { type: Date, default: Date.now },
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
