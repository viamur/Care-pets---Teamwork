const currentUser = async (req, res) => {
  const { name, email, city, phone } = req.user;
  res.status(200).json({
    name,
    email,
    city,
    phone,
  });
};

module.exports = currentUser;
