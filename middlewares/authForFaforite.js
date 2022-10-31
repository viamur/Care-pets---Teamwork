const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  /* Якщо нема токена або тип не той то переходимо далi */
  if (bearer !== 'Bearer' || token === '') {
    next();
    return;
  }

  try {
    /* Витягуємо id з token */
    const { id } = jwt.verify(token, SECRET_KEY);
    /* Шукаємо його в БД */
    const user = await User.findById(id);

    /* Якщо користувача не знайдено або він розлогінен то теж переходимо далі просто */
    if (!user || !user.token) {
      next();
      return;
    }

    /* Записуємо данні в req i переходимо далі */
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
