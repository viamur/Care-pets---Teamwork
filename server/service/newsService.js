const { newsSchema } = require("../models");

async function getNews() {
  return newsSchema.find();
}

module.exports = 
  getNews;
