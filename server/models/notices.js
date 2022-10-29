const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    bread: {
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
      required: true,
    },
    imgURL: {
      type: String,
      default: 'notices/default.png',
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

module.exports = { Notices };
