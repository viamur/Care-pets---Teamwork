const service = require('../../service');

/* ========================GET CATEGORY====================== */
const all = async (req, res) => {
  const { category } = req.query;
  const user = req.user;
  /* Якщо нема  category в query то помилку видаэмо*/
  if (!category) {
    res.status(400).json({ message: "Required in the 'category' query", success: false });
    return;
  }
  try {
    const response = await service.notices.getAll({ category });
    if (user) {
      const result = response.map(el => {
        let fa = el.favorite.includes(user.id);
        return { ...el?._doc, fa };
      });
      res.status(200).json({ data: result, success: true });
      return;
    }
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ========================GET ID====================== */
const id = async (req, res) => {
  try {
    const id = req.params.id;
    /* Перевіряємо чи є id якщо ні то видаємо помилку */
    if (!id) {
      res.status(400).json({
        message: 'id is required',
        success: false,
      });
      return;
    }
    const response = await service.notices.getById({ id });
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { all, id };
