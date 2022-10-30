const { User } = require("../../models/user");

const checkEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      check: true,
    });
  }
  res.status(201).json({
    check: false,
  });
};

module.exports = checkEmail;
