const service = require('../../service');

const get = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.notices.getFavorites({ id: user.id });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const add = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  /* Перевіряємо чи є id якщо ні то видаємо помилку */
  if (!id) {
    res.status(400).json({
      message: 'id is required',
    });
    return;
  }
  try {
    const response = await service.notices.addFavorites({ id, userId: user.id });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  /* Перевіряємо чи є id якщо ні то видаємо помилку */
  if (!id) {
    res.status(400).json({
      message: 'id is required',
    });
    return;
  }
  try {
    const response = await service.notices.delFavorites({ id, userId: user.id });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { get, add, remove };
