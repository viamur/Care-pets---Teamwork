const service = require('../../service');

const getUser = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.user.getUserInfo({ id: user.id });
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = getUser;
