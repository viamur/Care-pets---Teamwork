const express = require('express');
const { notices } = require('../controller');

const router = express.Router();

/* створити ендпоінт для отримання оголошень по категоріям по query  */
router.get('/', notices.get);
/* створити ендпоінт для отримання одного оголошення  */
router.get('/:id', notices.get);

/* створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем  */
router.get('/user', notices.user);
/* створити ендпоінт для додавання оголошень відповідно до обраної категорії */
router.post('/user', notices.user);
/* створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем   */
router.delete('/user/:id', notices.user);

/* створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані */
router.get('/favorite', notices.favorite);
/* створити ендпоінт для додавання оголошення до обраних */
router.patch('/favorite/:id', notices.favorite);
/* створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних */
router.delete('/favorite/:id', notices.favorite);

module.exports = router;
