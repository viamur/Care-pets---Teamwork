const { schemas } = require('../../models/user');
const service = require('../../service');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const convertingImgNotices = require('../../service/convertingImgNotices');

const addPet = async (req, res) => {
  /* Беремо данні з request */
  const file = req.file;
  const { user, body } = req;

  /* ==============Joi Валідація ================ */
  const { error } = schemas.addPet.validate(body);
  if (error) {
    return res.status(400).json({ message: error.message, success: false });
  }

  /* defaults img яку буде перезаписане якщо зображення прикріпленне к формі */
  let imgURL = 'pet/default.jpg';

  try {
    /* -------------якщо є зоображення то функція виконуєтся-------------- */
    if (file) {
      /* Генеруємо нове імя файлу та новий шлях*/
      const uuid = uuidv4();
      const extension = file.originalname.split('.').reverse()[0];
      const newName = `${uuid}.${extension}`;
      const newPathNotices = path.join(__dirname, '../../public/pet/', newName);

      /* Якщо тип файлу не  image/webp' то воно обрізає його, бібліотека не працює з циф форматом((*/
      if (file.mimetype !== 'image/webp') {
        /* Функція яка обрізає зображення та зберігає його у тій же папці  */
        await convertingImgNotices({ tmpDir: file.path });
      }

      /* Переміщуємо файл в іншу директорію */
      await fs.rename(file.path, newPathNotices);

      /* Перезаписуємо шлях до зображення */
      imgURL = `pet/${newName}`;
    }

    const response = await service.user.addPet({
      id: user.id,
      body: { ...body, imgURL },
    });
    res.status(200).json({ data: response.pets, success: true });
  } catch (error) {
    /* Видаляємо файл якщо помилка */
    file && fs.unlink(file.path);
    /* Відповідь сервера при помилки */
    res.status(500).json({ message: error.message, success: false });
  }
};

const removePet = async (req, res) => {
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
    await service.user.deletePet({ id, userId: user.id });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { addPet, removePet };
