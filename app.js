// Подключаем переменные окружения
require('dotenv').config();

// Импорт необходимых модулей
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); // 📌 Импорт маршрутов книг
const reviewRoutes = require('./routes/reviewRoutes');

// Создаем Express приложение
const app = express();

// Подключаем базу данных
connectDB();

// --- Логирование запросов ---
app.use(morgan('dev'));

// --- Middleware ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Настройка CORS ---
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Маршруты ---
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// --- Тестовый маршрут ---
app.get('/', (req, res) => {
  res.send('Book Tracker API is running...');
});

// --- Обработка ошибок ---
app.use((req, res) => res.status(404).json({ message: 'API not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// --- Запуск сервера ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));