const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const menuSchema = new mongoose.Schema({
  Chinese: [foodItemSchema],
  Desserts: [foodItemSchema],
  Indian: [foodItemSchema],
  Italian: [foodItemSchema],
  MainCourse: [foodItemSchema],
  Starters: [foodItemSchema]
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
