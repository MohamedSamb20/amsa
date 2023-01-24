const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  userId: String,
  exercise: String, //list
  sets: Number,
  reps: Number,
  weightUsed: Number,
  
  
});

// compile model from schema
module.exports = mongoose.model("exercise", ExerciseSchema);
//log workout -> list of exercises