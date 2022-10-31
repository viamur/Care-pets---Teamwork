const express = require('express');
const { authenticate } = require('../middlewares');
const { user } = require('../controller');
const upload = require('../service/upload');

const router = express.Router();

/* "створити ендпоінт для отримання:
  - особистої інформації про користувача
  - інформації про тварин корисувача" */
router.get('/', authenticate, user.get);
/* створити ендпоінт для оновлення одного з полів контактної інформації про користувача */
router.patch('/', authenticate, upload.single('avatar'), user.path);
/* створити ендпоінт для додавання карточки тварини користувача */
router.post('/pet', authenticate, upload.single('pet'), user.pet.addPet);
/* створити ендпоінт для видалення карточки з твариною користувача */
router.delete('/pet/:id', authenticate, user.pet.removePet);

module.exports = router;
