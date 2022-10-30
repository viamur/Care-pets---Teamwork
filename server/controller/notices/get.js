const service = require('../../service');

const all = async (req, res) => {
  const category = req.query;
  try {
    const response = await service.notices.getAll({ category });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const id = async (req, res) => {
  try {
    const id = req.params.id;
    /* Перевіряємо чи є id якщо ні то видаємо помилку */
    if (!id) {
      res.status(400).json({
        message: 'id is required',
      });
      return;
    }
    const response = await service.notices.getById({ id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { all, id };
