const { Notices, joiValidGetCategory, joiValidPostUser, joiSchemaPostUser } = require('./notices');
const newsSchema = require('./newsSchema');
const ourFriendsSchema = require('./friendsSchema');

module.exports = {
  newsSchema,
  ourFriendsSchema,
  Notices,
  joiValidGetCategory,
  joiValidPostUser,
  joiSchemaPostUser,
};
