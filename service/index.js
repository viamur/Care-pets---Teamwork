const notices = require('./notices');
const getNews = require('./newsService');
const getOurFriends = require('./ourFriendsService');
const user = require('./user');

module.exports = {
  getNews,
  getOurFriends,
  notices,
  user,
};
