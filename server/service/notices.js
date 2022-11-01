const { Notices } = require('../models');

const getAll = async ({ category }) => {
  const result = await Notices.find(
    { category },
    '-createdAt -updatedAt -owner -comments -sex -name'
  );
  return result;
};
const getById = async ({ id }) => {
  /* paht - назва ключа. select - що показати. model - назва моделі к якій треба звернутися щоб взяти данні */
  const result = await Notices.findById(id, '-createdAt -updatedAt').populate({
    path: 'owner',
    select: 'email phone -_id',
    model: 'user',
  });
  return result;
};

const getUserPets = async ({ id }) => {
  const result = await Notices.find(
    { owner: id },
    '-createdAt -updatedAt -comments -sex -name -owner'
  );
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
  const result = await Notices.find(
    { favorite: id },
    '-createdAt -updatedAt -owner -comments -sex -name -favorite'
  );
  return result;
};
const addFavorites = async ({ id, userId }) => {
  /* Додає в массив якщо його нема $addToSet*/
  const notices = await Notices.findByIdAndUpdate(id, { $addToSet: { favorite: userId } });
  return notices;
};
const delFavorites = async ({ id, userId }) => {
  /* Видаляє із массива те що треба за допомогою $pull */
  const notices = await Notices.findByIdAndUpdate(id, { $pull: { favorite: userId } });
  return notices;
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
