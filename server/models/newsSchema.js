const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    date: {
      type: String,
    },
    link: {
      type: String,
    },
  }
);

const newsSchema = mongoose.model('news', news);

module.exports = newsSchema;