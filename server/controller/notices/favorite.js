const service = require('../../service');

/* ============================GET============================= */
const get = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.notices.getFavorites({ id: user.id });
    const result = response.map(el => ({ ...el?._doc, favorite: true })).reverse();
    res.status(200).json({ data: result, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ============================PATH============================= */
const add = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  /* Перевіряємо чи є id якщо ні то видаємо помилку */
  if (!id) {
    res.status(400).json({
      message: 'id is required',
      success: false,
    });
    return;
  }
  try {
    await service.notices.addFavorites({ id, userId: user.id });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ============================DELETE============================= */
const remove = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  /* Перевіряємо чи є id якщо ні то видаємо помилку */
  if (!id) {
    res.status(400).json({
      message: 'id is required',
      success: false,
    });
    return;
  }
  try {
    await service.notices.delFavorites({ id, userId: user.id });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { get, add, remove };
