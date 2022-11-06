const { schemas } = require('../../models/user');
const service = require('../../service');
const fs = require('fs').promises;
const { clodinaryUpload, clodinaryRemove } = require('../../service/cloudinary');

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
  let imgURL = 'https://pet-support.herokuapp.com/pet/default.jpg';

  try {
    /* =======Загрузка файла======= */
    if (file) {
      imgURL = await clodinaryUpload(file.path, 'pet');
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

/* ============Удаление из акаунта животного============ */
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
    const response = await service.user.deletePet({ id, userId: user.id });
    const pet = response.pets.filter(el => el._id === id);
    if (pet) {
      /* Удаляем файл с животного на cloudinary */
      await clodinaryRemove(pet?.imgURL, 'pet');
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { addPet, removePet };
