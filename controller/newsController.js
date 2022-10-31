const { Router } = require('express');
const { getNews } = require('../service');

const router = Router();

router.get('/', async function (req, res, next) {
  try {
    const news = await getNews();

    res.json({
      data: news,
      sacces: true,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
