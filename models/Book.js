const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Reading', 'Completed', 'Wishlist'],
    default: 'Reading',
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
