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

    /* Якщо користувач авторизован то перебираємо массив оголошень, шукаємо чи оголошення у користувача в favorite */
    if (user) {
      const result = response.map(el => {
        const favorite = el.favorite.includes(user.id);
        return { ...el?._doc, favorite };
      });
      res.status(200).json({ data: result, success: true });
      return;
    }
    /* Якщо користувач не авторизован перебираєм массив і просто замінюємо favorite і ставимо false */
    const newResponse = response.map(el => ({ ...el?._doc, favorite: false }));

    res.status(200).json({ data: newResponse, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* ========================GET ID====================== */
const id = async (req, res) => {
  try {
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
    const response = await service.notices.getById({ id });
    /* Якщо користувач авторизован то шукаємо чи оголошення у користувача в favorite */
    if (user) {
      const favorite = response.favorite.includes(user.id);
      res.status(200).json({ data: { ...response?._doc, favorite }, success: true });
      return;
    }
    /* Якщо користувач не авторизован і просто замінюємо favorite і ставимо false */
    res.status(200).json({ data: { ...response?._doc, favorite: false }, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { all, id };
