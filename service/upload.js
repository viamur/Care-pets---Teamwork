const path = require('path');
const multer = require('multer');

/* Шлях до папки tmp */
const tmpDir = path.join(__dirname, '../tmp');

/* Налаштування multer */
const storage = multer.diskStorage({
  /* Вибираємо куди зберегти файл */
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },

  /* Вибираємо ім'я файл */
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
