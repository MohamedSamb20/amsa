const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  userId: String,
  exercise: String,
  sets: Number,
  reps: Number,
  
});

// compile model from schema
module.exports = mongoose.model("exercise", ExerciseSchema);