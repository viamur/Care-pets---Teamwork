const express = require('express');
const { newsController } = require('../controller');

const router = express.Router();

/* створити ендпоінт для отримання оголошень по категоріям по query  */
router.get('/', newsController);

module.exports = router;