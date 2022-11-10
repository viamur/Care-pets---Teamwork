const express = require('express');

const controller = require('../controller/auth/index');
const { ctrlWrapper } = require('../helpers/index');
const { validateSchema, authenticate } = require('../middlewares/index');
const { schemas } = require('../models/user');

const router = express.Router();

router.post('/signup', validateSchema(schemas.singupSchema), ctrlWrapper(controller.signup));

router.post('/login', validateSchema(schemas.loginSchema), ctrlWrapper(controller.login));

router.get('/logout', authenticate, ctrlWrapper(controller.logout));

router.post('/checkemail', validateSchema(schemas.checkEmail), ctrlWrapper(controller.checkEmail));

module.exports = router;
