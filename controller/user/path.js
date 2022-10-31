const service = require('../../service');
const fs = require('fs').promises;
const path = require('path');
const convertingImgNotices = require('../../service/convertingImgNotices');
const { schemas } = require('../../models/user');

const pathUser = async (req, res) => {
  const user = req.user;
  const file = req.file;

  /* ==============Joi Валідація ================ */
  const { error } = schemas.pathUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, success: false });
    return;
  }

  /* defaults img яку буде перезаписане якщо зображення прикріпленне к формі */
  let avatarURL = 'avatar/default.jpg';

  try {
    const beforeUpdateInfoUser = await service.user.getUserInfo({ id: user.id });
    avatarURL = beforeUpdateInfoUser.avatarURL;
    /* -------------якщо є зоображення то функція виконуєтся-------------- */
    if (file) {
      /* Генеруємо нове імя файлу та новий шлях*/
      const extension = file.originalname.split('.').reverse()[0];
      const newName = `${user.id}.${extension}`;
      const newPathNotices = path.join(__dirname, '../../public/avatar/', newName);

      /* Якщо тип файлу не  image/webp' то воно обрізає його, бібліотека не працює з циф форматом((*/
      if (file.mimetype !== 'image/webp') {
        /* Функція яка обрізає зображення та зберігає його у тій же папці  */
        await convertingImgNotices({ tmpDir: file.path });
      }

      /* Переміщуємо файл в іншу директорію */
      await fs.rename(file.path, newPathNotices);

      /* Перезаписуємо шлях до зображення */
      avatarURL = `avatar/${newName}`;
    }
    const response = await service.user.updateUser({
      id: user.id,
      body: { ...req.body, avatarURL },
    });
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    /* Видаляємо файл якщо помилка */
    fs.unlink(file.path);
    /* Відповідь сервера при помилки */
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = pathUser;
