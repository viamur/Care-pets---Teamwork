const service = require('../../service');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const convertingImgNotices = require('../../service/convertingImgNotices');
const { joiSchemaPostUser } = require('../../models');
/* ======================GET================================== */
const get = async (req, res) => {
  const user = req.user;
  try {
    const response = await service.notices.getUserPets({ id: user.id });
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

/* ======================POST================================== */
const add = async (req, res) => {
  /* Беремо данні з request */
  const file = req.file;
  const { user, body } = req;

  /* ==============Joi Валідація ================ */
  const { error } = joiSchemaPostUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, success: false });
    return;
  }

  /* Делаем валидацию поля price */
  if (body.category === 'sell' && typeof body?.price !== 'number') {
    return res.status(400).json({
      message: 'The price field type must be a number and a number greater than 0',
      success: false,
    });
  }

  /* defaults img яку буде перезаписане якщо зображення прикріпленне к формі */
  let imgURL = 'notices/default.jpg';

  try {
    /* -------------якщо є зоображення то функція виконуєтся-------------- */
    if (file) {
      /* Генеруємо нове імя файлу та новий шлях*/
      const uuid = uuidv4();
      const extension = file.originalname.split('.').reverse()[0];
      const newName = `${uuid}.${extension}`;
      const newPathNotices = path.join(__dirname, '../../public/notices/', newName);

      /* Якщо тип файлу не  image/webp' то воно обрізає його, бібліотека не працює з циф форматом((*/
      if (file.mimetype !== 'image/webp') {
        /* Функція яка обрізає зображення та зберігає його у тій же папці  */
        await convertingImgNotices({ tmpDir: file.path });
      }

      /* Переміщуємо файл в іншу директорію */
      await fs.rename(file.path, newPathNotices);

      /* Перезаписуємо шлях до зображення */
      imgURL = `/notices/${newName}`;
    }

    const response = await service.notices.addUserPets({ id: user.id, body: { ...body, imgURL } });

    res.status(201).json({ data: { ...response?._doc, favorite: false }, success: true });
  } catch (error) {
    /* Видаляємо файл якщо помилка */
    fs.unlink(file.path);
    /* Відповідь сервера при помилки */
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
