const getAll = ({ category }) => {};
const getById = ({ id }) => {};

const getUserPets = ({ id }) => {};
const addUserPets = ({ id, body }) => {};
const delUserPets = ({ owner, id }) => {};

const getFavorites = ({ id }) => {};
const addFavorites = ({ id, userId }) => {};
const delFavorites = ({ id, userId }) => {};

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
