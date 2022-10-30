const express = require('express');
const { notices } = require('../controller');

const router = express.Router();

/* створити ендпоінт для отримання оголошень по категоріям по query  */
router.get('/', notices.get.all);
/* створити ендпоінт для отримання одного оголошення  */
router.get('/:id', notices.get.id);

/* створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем  */
router.get('/user', notices.user.get);
/* створити ендпоінт для додавання оголошень відповідно до обраної категорії */
router.post('/user', notices.user.add);
/* створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем   */
router.delete('/user/:id', notices.user.remove);

/* створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані */
router.get('/favorite', notices.favorite.get);
/* створити ендпоінт для додавання оголошення до обраних */
router.patch('/favorite/:id', notices.favorite.add);
/* створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних */
router.delete('/favorite/:id', notices.favorite.remove);

module.exports = router;
