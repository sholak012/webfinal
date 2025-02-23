const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getBooks, 
  addBook, 
  addReview,
  deleteBook,
  getReviews // ✅ Функция импортирована
} = require('../controllers/bookController');

// Маршруты
router.get('/', protect, getBooks);
router.post('/', protect, addBook);
router.post('/:id/reviews', protect, addReview);
router.get('/:id/reviews', getReviews); // ✅ Использование функции
// routes/bookRoutes.js
router.delete('/:id', protect, deleteBook); // Добавьте эту строку
module.exports = router;