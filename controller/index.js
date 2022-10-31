const notices = require('./notices');
const newsController = require('./newsController');
const friendsController = require('./friendsController');
const user = require('./user');

module.exports = {
  newsController,
  friendsController,
  notices,
  user,
};
