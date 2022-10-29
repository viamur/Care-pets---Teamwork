const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/user");
const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(createError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(createError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};

module.exports = authenticate;
