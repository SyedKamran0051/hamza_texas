const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['wings', 'burgers', 'sides', 'drinks', 'other']
  },
  subCategory: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
