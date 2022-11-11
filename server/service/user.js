const { User } = require('../models/user');

const getUserInfo = async ({ id }) => {
  const response = await User.findById(id, '-password -token -createdAt -updatedAt');
  return response;
};
const updateUser = async ({ id, body }) => {
  const response = await User.findByIdAndUpdate(id, body, {
    new: true,
    select: '-password -token -createdAt -updatedAt -pets',
  });
  return response;
};

const addPet = async ({ id, body }) => {
  const response = await User.findByIdAndUpdate(id, { $addToSet: { pets: body } }, { new: true });
  return response;
};

const deletePet = async ({ id, userId }) => {
  const response = await User.findByIdAndUpdate(userId, { $pull: { pets: { _id: id } } });

  return response;
};

module.exports = {
  getUserInfo,
  updateUser,
  addPet,
  deletePet,
};
