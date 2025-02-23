const Book = require('../models/Book');
const Review = require('../models/Review');

// 📌 Функция получения списка книг
// bookController.js (функция getBooks)
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).populate('reviews'); // Добавьте populate
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// 📌 Функция добавления книги
const addBook = async (req, res) => {
  try {
    const { title, author, status } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Please provide title and author' });
    }

    const book = new Book({
      user: req.user.id, // Привязываем книгу к пользователю
      title,
      author,
      status: status || 'Reading',
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
};

// 📌 Функция добавления отзыва
const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    const reviews = await Review.find({ bookId: req.params.id });
    res.json(reviews);
    const review = new Review({
      bookId,
      userId: req.user.id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};
// controllers/bookController.js
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    // Проверка прав пользователя
    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав для удаления' });
    }

    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: 'Книга удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error: error.message });
  }
};

// Экспортируйте функцию

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// 📌 Экспорт функций
module.exports = { 
  getBooks, 
  addBook, 
  addReview,
  getReviews,
  deleteBook // Добавлено
};