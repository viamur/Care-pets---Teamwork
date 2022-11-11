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

/* -------------якщо є зоображення то функція виконуєтся-------------- */
// if (file) {
//   /* Генеруємо нове імя файлу та новий шлях*/
//   const uuid = uuidv4();
//   const extension = file.originalname.split('.').reverse()[0];
//   const newName = `${uuid}.${extension}`;
//   const newPathNotices = path.join(__dirname, '../../public/notices/', newName);

//   /* Якщо тип файлу не  image/webp' то воно обрізає його, бібліотека не працює з циф форматом((*/
//   if (file.mimetype !== 'image/webp') {
//     /* Функція яка обрізає зображення та зберігає його у тій же папці  */
//     await convertingImgNotices({ tmpDir: file.path });
//   }

//   /* Переміщуємо файл в іншу директорію */
//   await fs.rename(file.path, newPathNotices);

//   /* Перезаписуємо шлях до зображення */
//   imgURL = `notices/${newName}`;
// }
