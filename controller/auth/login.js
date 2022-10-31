const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createError } = require("../../helpers/index");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email not found");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw createError(401, "Password wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7 days" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      email: user.email,
    },
    token,
  });
};

module.exports = login;
