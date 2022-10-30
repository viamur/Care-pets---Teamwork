const { User } = require('../models/user');

const getUserInfo = async ({ id }) => {
  const response = await User.findById(id, '-password -token -createdAt -updatedAt');
  return response;
};
const updateUser = async ({ id, body }) => {
  console.log(body);
  const response = await User.findByIdAndUpdate(id, body, {
    new: true,
    select: '-password -token -createdAt -updatedAt',
  });
  return response;
};

module.exports = {
  getUserInfo,
  updateUser,
};
