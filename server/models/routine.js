const mongoose = require("mongoose");

const RoutineSchema = new mongoose.Schema({
  userId: String,
  routineOptions: [String],
  Monday: String,
  Tuesday: String,
  Wednesday: String,
  Thursday: String,
  Friday: String,
  Saturday : String,
  Sunday: String
 
});

// compile model from schema
module.exports = mongoose.model("routine", RoutineSchema);
//log workout -> list of exercises