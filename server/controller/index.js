const notices = require('./notices');
const newsRouter = require('./newsController');
const friendsRouter = require('./friendsController');

module.exports = {
  newsRouter,
  friendsRouter,
  notices,
};
