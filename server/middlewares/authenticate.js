const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models/user');
const { createError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  /* Беремо з headers данні */
  const { authorization = '' } = req.headers;
  /* Розбиваємо строку на строки массива */
  const [bearer, token] = authorization.split(' ');
  /* Перевіряємо тип токену та чи є токін*/
  if (bearer !== 'Bearer' || token === '') {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  try {
    /* Витягуємо id з payload нашого токену */
    const { id } = jwt.verify(token, SECRET_KEY);
    /* Шукаємо користувача з id в БД */
    const user = await User.findById(id);

    /* Перевіряємо якщо користувач не знайден, або якщо він вже розлогінен */
    if (!user || !user.token) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    /* Записуєм в реквест данні юзера */
    req.user = user;
    /* Переходимо далі */
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = authenticate;
