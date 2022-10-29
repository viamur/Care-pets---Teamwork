const service = require('../../service');
/* ======================GET================================== */
const get = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.notices.getUserPets({ id: user.id });
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ======================POST================================== */
const add = async (req, res) => {
  const { user, body } = req;

  /* Делаем валидацию поля price */
  if (body.category === 'sell' && typeof body?.price !== 'number') {
    return res.status(400).json({
      message: 'The price field type must be a number and a number greater than 0',
      success: false,
    });
  }

  try {
    const response = await service.notices.addUserPets({ id: user.id, body });
    res.status(201).json({ data: response, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ======================DELETE================================== */
const remove = async (req, res) => {
  const { user } = req;
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
    const response = await service.notices.delUserPets({ owner: user.id, id });

    /* Якщо незнайдено то помилка */
    if (!response) {
      res.status(404).json({
        message: 'Not found',
        success: false,
      });
      return;
    }

    /* Якщо видалило з БД запис */
    res.status(202).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { get, add, remove };
