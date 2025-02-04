const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');  // Импортируем маршруты из userRoutes.js
const groupRoutes = require('./src/routes/groupRoutes');  // Импортируем маршруты из userRoutes.js
const schoolRoutes = require('./src/routes/schoolRoutes');  // Импортируем маршруты из userRoutes.js
const { AppDataSource } = require('./src/config/data-source'); // Подключаем DataSource для TypeORM

const app = express();
const port = process.env.PORT;

// Используем CORS для разрешения запросов с других доменов
app.use(cors());

// Мидлвар для парсинга JSON в теле запроса
app.use(bodyParser.json());

// Подключаем маршруты из userRoutes
app.use('/api/users', userRoutes);  // Маршруты будут доступны по /api/users
app.use('/api/groups', groupRoutes);  // Маршруты будут доступны по /api/users
app.use('/api/schools', schoolRoutes);  // Маршруты будут доступны по /api/users


// Подключение к базе данных PostgreSQL через TypeORM
AppDataSource.initialize()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.log('Failed to connect to PostgreSQL', err));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
