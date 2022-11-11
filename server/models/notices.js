const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const noticesSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['lostFound', 'inGoodHands', 'sell'],
      required: true,
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: true,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
    },
    birthdate: {
      type: Date,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    location: {
      type: String,
      minLength: 2,
      maxLength: 24,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    imgURL: {
      type: String,
      default: 'https://pet-support.herokuapp.com/notices/default.jpg',
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    favorite: {
      type: Array,
      of: Schema.Types.ObjectId,
    },
  },
  { versionKey: false, timestamps: true }
);

const Notices = mongoose.model('notices', noticesSchema);

/* Joi Валідація ========================= */

//GET notices/
const joiSchemaGetCategory = Joi.object({
  category: Joi.string().valid('lostFound', 'inGoodHands', 'sell').required(),
});
const joiValidGetCategory = (req, res, next) => {
  const { error } = joiSchemaGetCategory.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
  next();
};
//POST notices/user/ ₴₴ перевірка required для price у самому контроллері
const joiSchemaPostUser = Joi.object({
  category: Joi.string().valid('lostFound', 'inGoodHands', 'sell').required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16),
  birthdate: Joi.date(),
  breed: Joi.string().min(2).max(24),
  sex: Joi.string().valid('male', 'female').required(),
  location: Joi.string().min(2).max(24).required(),
  price: Joi.number().integer().min(1),
  comments: Joi.string().min(8).max(120),
});
const joiValidPostUser = (req, res, next) => {
  const { error } = joiSchemaPostUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
  next();
};

// EXPORTS
module.exports = { Notices, joiValidGetCategory, joiValidPostUser, joiSchemaPostUser };
