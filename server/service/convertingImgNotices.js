const Jimp = require('jimp');

const convertingImgNotices = async ({ tmpDir }) => {
  /* Знаходимо зображення */
  const image = await Jimp.read(tmpDir);

  /* Задаємо розмір та зберігаємо результат */
  await image.cover(350, 350).writeAsync(tmpDir);
};

module.exports = convertingImgNotices;
