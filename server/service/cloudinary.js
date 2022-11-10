require('dotenv').config();
const fs = require('fs').promises;
const cloudinary = require('cloudinary').v2;
/* ======================Конфигурация CLOUDINARY============================== */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const clodinaryUpload = async (path, folder) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(path, {
    width: 350,
    height: 350,
    gravity: 'auto',
    crop: 'fill',
    folder,
  });
  fs.unlink(path);
  return cloudinaryResponse.secure_url;
};

const clodinaryRemove = async (url, folder) => {
  /* Получаем с этого 
  'https://res.cloudinary.com/dcbi80env/image/upload/v1667743499/qyargewy57sodmi8f09v.jpg'
   вот это 
    'qyargewy57sodmi8f09v' */
  const public_id = url.split('/').reverse()[0].split('.')[0];

  const response = await cloudinary.uploader.destroy(folder + '/' + public_id);
  console.log(response);
};

module.exports = { clodinaryUpload, clodinaryRemove };
