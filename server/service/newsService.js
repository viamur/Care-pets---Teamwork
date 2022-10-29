const { newsSchema } = require("./mongooseSchema");

async function getNews() {
  return newsSchema.find();
}

module.exports = 
  getNews;
