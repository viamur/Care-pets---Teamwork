const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSchemaValidationErrors } = require('../helpers');

// const emailRegex = /^[a-zA-Z0-9^\s@]+@[a-zA-Z^\s@]+\.[a-zA-Z^\s@]+$/;
const phoneRegex = /^\+380\d{9}/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{7,32}$/;
// const cityRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32},(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32}$/;

const userShema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxLength: 10,
    },
    email: {
      type: String,
      minlength: 6,
      maxLength: 63,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    phone: {
      type: String,
      unique: true,
    },
    city: {
      type: String,
    },
    pets: [
      {
        name: {
          type: String,
          minlength: 2,
          maxLength: 16,
        },
        birthday: {
          type: Date,
        },
        breed: {
          type: String,
          minlength: 2,
          maxLength: 10,
        },
        imgURL: {
          type: String,
          default: 'https://pet-support.herokuapp.com/pet/default.jpg',
        },
        comments: {
          type: String,
          minlength: 2,
          maxLength: 120,
        },
      },
    ],
    avatarURL: {
      type: String,
      default: 'https://pet-support.herokuapp.com/avatar/default.jpg',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', handleSchemaValidationErrors);

const singupSchema = Joi.object({
  email: Joi.string().email().min(5).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
  name: Joi.string().min(2).max(20).required(),
  city: Joi.string().min(2).max(30).required(),
  phone: Joi.string().length(13).pattern(phoneRegex).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(5).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
});

const pathUser = Joi.object({
  email: Joi.string().email().min(5).max(40),
  name: Joi.string().min(2).max(20),
  city: Joi.string().min(2).max(30),
  phone: Joi.string().length(13).pattern(phoneRegex),
  birthday: Joi.date(),
});

const addPet = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  birthday: Joi.date().required(),
  breed: Joi.string().min(2).max(24).required(),
  imgURL: Joi.string(),
  comments: Joi.string().min(2).max(120),
});

const checkEmail = Joi.object({
  email: Joi.string().email().min(5).max(40).required(),
});

const schemas = {
  singupSchema,
  loginSchema,
  pathUser,
  addPet,
  checkEmail,
};

const User = model('user', userShema);

module.exports = {
  User,
  schemas,
};
