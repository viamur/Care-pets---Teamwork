const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { createError } = require("../../helpers/index");

const signup = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    city,
    phone,
  });
  res.status(201).json(result);
};

module.exports = signup;
