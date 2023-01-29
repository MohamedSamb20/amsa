// import exercise from "./exercise";
// import ExerciseSchema from ../models/exercise.js
const mongoose = require("mongoose");

const LastWorkoutSchema = new mongoose.Schema({
  userId: String,
  username: String,
  workoutType: String,
  weightUnit: String,
  exerciseIds: [],
  day: {type: Number, default: Math.floor(Date.now()/(1000*60*60*24))}
});

// compile model from schema
module.exports = mongoose.model("lastWorkout", LastWorkoutSchema);
