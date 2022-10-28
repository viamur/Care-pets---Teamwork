const express = require("express");

const controller = require("../controller/auth/index");
const { ctrlWrapper } = require("../helpers/index");
const { validateSchema, authenticate } = require("../middlewares/index");
const { schemas } = require("../../server/models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validateSchema(schemas.singupSchema),
  ctrlWrapper(controller.signup)
);

router.post(
  "/users/login",
  validateSchema(schemas.loginSchema),
  ctrlWrapper(controller.login)
);

router.get("/users/logout", authenticate, ctrlWrapper(controller.logout));

router.get("/users/current", authenticate, ctrlWrapper(controller.currentUser));

module.exports = router;
