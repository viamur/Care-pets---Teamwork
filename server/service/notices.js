const { Notices } = require('../models');

const getAll = async ({ category }) => {
  const result = await Notices.find({ category });
  return result;
};
const getById = async ({ id }) => {
  const result = await Notices.findById(id);
  return result;
};

const getUserPets = async ({ id }) => {
  const result = await Notices.find({ owner: id });
  return result;
};
const addUserPets = async ({ id, body }) => {
  const result = await Notices.create({ ...body, owner: id });
  return result;
};
const delUserPets = async ({ owner, id }) => {
  const result = await Notices.findOneAndDelete({ _id: id, owner });
  return result;
};

const getFavorites = async ({ id }) => {
  const result = await Notices.find({ favorite: id });
  return result;
};
const addFavorites = async ({ id, userId }) => {
  const notices = await Notices.findById(id);
  const result = await Notices.findByIdAndUpdate(
    id,
    { favorite: [...notices.favorite, userId] },
    { new: true }
  );
  return result;
};
const delFavorites = async ({ id, userId }) => {
  const notices = await Notices.findById(id);
  const newNotices = notices.favorite.filter(el => el !== userId);
  const result = await Notices.findByIdAndUpdate(
    id,
    { favorite: [...newNotices.favorite] },
    { new: true }
  );
  return result;
};

module.exports = {
  getAll,
  addUserPets,
  delUserPets,
  getById,
  getUserPets,
  getFavorites,
  addFavorites,
  delFavorites,
};
