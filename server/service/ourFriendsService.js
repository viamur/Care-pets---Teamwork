const { ourFriendsSchema } = require("../models");

async function getOurFriends() {
  return ourFriendsSchema.find();
}

module.exports = 
 getOurFriends;