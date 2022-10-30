const notices = require('./notices');
const auth = require('./auth');
const news = require('./newsRoute');
const friends = require('./friendsRoute');

module.exports = {
  auth,
  notices,
  news,
  friends
};
