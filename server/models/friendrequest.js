const mongoose = require("mongoose");

const FriendrequestSchema = new mongoose.Schema({
  userId: String,
  requester : String,
});

// compile model from schema
module.exports = mongoose.model("friendrequest", FriendrequestSchema);