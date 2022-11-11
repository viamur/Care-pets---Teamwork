const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friends = new Schema({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  time: {
    type: String,
  },
  adress: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ourFriendsSchema = mongoose.model("services-sidebas", friends);

module.exports = ourFriendsSchema;