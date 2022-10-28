const service = require('../../service');

const get = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.notices.getUserPets({ id: user.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const add = async (req, res) => {
  const { user, body } = req;
  try {
    const response = await service.notices.addUserPets({ id: user.id, body });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { user } = req;
  const id = req.params.id;
  /* Перевіряємо чи є id якщо ні то видаємо помилку */
  if (!id) {
    res.status(400).json({
      message: 'id is required',
    });
    return;
  }
  try {
    const response = await service.notices.delUserPets({ owner: user.id, id });
    res.status(204).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { get, add, remove };
