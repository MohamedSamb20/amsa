// import exercise from "./exercise";
// import ExerciseSchema from ../models/exercise.js
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: String,
  username: String,
  workoutType: String,
  weightUnit: String,
  exerciseIds: [],
  timestamp: { type: Date, default: Date.now },
  day: {type: Number, default: Math.floor(Date.now()/(1000*60*60*24))}
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
