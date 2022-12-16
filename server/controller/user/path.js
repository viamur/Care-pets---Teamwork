const service = require('../../service');
const fs = require('fs').promises;
const path = require('path');
const convertingImgNotices = require('../../service/convertingImgNotices');
const { schemas } = require('../../models/user');
const { clodinaryUpload, clodinaryRemove } = require('../../service/cloudinary');

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
  let avatarURL = 'https://care-pets-backend.goit.global/avatar/default.jpg';

  try {
    const beforeUpdateInfoUser = await service.user.getUserInfo({ id: user.id });
    avatarURL = beforeUpdateInfoUser.avatarURL;

    /* =======Загрузка файла======= */
    if (file) {
      avatarURL = await clodinaryUpload(file.path, 'avatar');

      /* Удалить изображение с cloudinary если изображение не равно default */
      if (
        beforeUpdateInfoUser.avatarURL !== 'https://care-pets-backend.goit.global/avatar/default.jpg'
      ) {
        await clodinaryRemove(beforeUpdateInfoUser.avatarURL, 'avatar');
      }
    }

    const response = await service.user.updateUser({
      id: user.id,
      body: { ...req.body, avatarURL },
    });
    res.status(200).json({ data: response, success: true });
  } catch (error) {
    /* Видаляємо файл якщо помилка */
    file && fs.unlink(file.path);
    /* Відповідь сервера при помилки */
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = pathUser;
