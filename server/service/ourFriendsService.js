const { ourFriendsSchema } = require("./mongooseSchema");

async function getOurFriends() {
  return ourFriendsSchema.find();
}

module.exports = 
 getOurFriends;