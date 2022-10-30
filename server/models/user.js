const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
// const phoneRegex = /[+380]+[0-9].{10}/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{7,32}$/;
const cityRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{3,32},(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{3,32}$/;

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
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
    },
    birthday: {
      type: Date,
      default: new Date(),
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
          default: new Date(),
        },
        breed: {
          type: String,
          minlength: 2,
          maxLength: 10,
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
      default: "avatar/avatar.png",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", handleSchemaValidationErrors);

const singupSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).min(6).required(),
  password: Joi.string().pattern(passwordRegex).min(7).max(32).required(),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  name: Joi.string().min(2).max(10).required(),
  city: Joi.string().pattern(cityRegex).required(),
  phone: Joi.string().min(9).max(13).required(),
  // phone: Joi.string().pattern(phoneRegex).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(63).pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  singupSchema,
  loginSchema,
};

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};
