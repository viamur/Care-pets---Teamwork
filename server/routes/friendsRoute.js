const express = require('express');
const { friendsController } = require('../controller');

const router = express.Router();
router.get('/', friendsController);

module.exports = router;