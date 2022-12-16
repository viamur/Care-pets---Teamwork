const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSchemaValidationErrors } = require('../helpers');

const emailRegex = /^[a-zA-Z0-9^\s@]+@[a-zA-Z^\s@]+\.[a-zA-Z^\s@]+$/;
const phoneRegex = /^\+380\d{9}/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{7,32}$/;
const cityRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32},(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32}$/;

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
      match: emailRegex,
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
          maxLength: 10,
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
          default: 'https://care-pets-backend.goit.global/pet/default.jpg',
        },
        comments: {
          type: String,
          minlength: 2,
          maxLength: 50,
        },
      },
    ],
    avatarURL: {
      type: String,
      default: 'https://care-pets-backend.goit.global/avatar/default.jpg',
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
  email: Joi.string().pattern(emailRegex).min(6).max(25).required(),
  password: Joi.string().pattern(passwordRegex).min(7).max(32).required(),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
  name: Joi.string().min(2).max(10).required(),
  city: Joi.string().pattern(cityRegex).required(),
  phone: Joi.string().length(13).pattern(phoneRegex).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(25).pattern(emailRegex).required(),
  password: Joi.string().min(7).max(32).required(),
});

const pathUser = Joi.object({
  email: Joi.string().pattern(emailRegex).min(6).max(25),
  name: Joi.string().min(2).max(10),
  city: Joi.string().pattern(cityRegex),
  phone: Joi.string().length(13).pattern(phoneRegex),
  birthday: Joi.date(),
});

const addPet = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.date().required(),
  breed: Joi.string().min(2).max(24).required(),
  imgURL: Joi.string(),
  comments: Joi.string().min(8).max(120),
});

const checkEmail = Joi.object({
  email: Joi.string().min(6).max(25).pattern(emailRegex).required(),
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
