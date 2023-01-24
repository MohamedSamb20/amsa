const mongoose = require("mongoose");

const FriendshipSchema = new mongoose.Schema({
  userId: String,
  friendId : String,
}); 

// compile model from schema
module.exports = mongoose.model("friendship", FriendshipSchema);
