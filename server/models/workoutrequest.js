const mongoose = require("mongoose");

const WorkoutrequestSchema = new mongoose.Schema({
  userId: String,
  requester : String,
  time: String,
  routine: String,
  notes: String,
});

// compile model from schema
module.exports = mongoose.model("workoutrequest", WorkoutrequestSchema);