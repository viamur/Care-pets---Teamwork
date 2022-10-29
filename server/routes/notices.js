const express = require('express');
const { notices } = require('../controller');
const { authFaforite, authenticate } = require('../middlewares');

const router = express.Router();

/* створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем  */
router.get('/user', authenticate, notices.user.get);
/* створити ендпоінт для додавання оголошень відповідно до обраної категорії */
router.post('/user', authenticate, notices.user.add);
/* створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем   */
router.delete('/user/:id', authenticate, notices.user.remove);

/* створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані */
router.get('/favorite', authenticate, notices.favorite.get);
/* створити ендпоінт для додавання оголошення до обраних */
router.patch('/favorite/:id', authenticate, notices.favorite.add);
/* створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних */
router.delete('/favorite/:id', authenticate, notices.favorite.remove);

/* створити ендпоінт для отримання оголошень по категоріям по query  */
router.get('/', authFaforite, notices.get.all);
/* створити ендпоінт для отримання одного оголошення  */
router.get('/:id', authFaforite, notices.get.id);

module.exports = router;
