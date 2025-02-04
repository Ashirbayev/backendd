const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const schoolRoutes = require('./src/routes/schoolRoutes');
const { AppDataSource } = require('./src/config/data-source');

const app = express();
const port = process.env.PORT || 3000; // Добавил значение по умолчанию

// Используем CORS для разрешения запросов с других доменов
app.use(cors());
app.use(bodyParser.json());

// Подключаем маршруты
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/schools', schoolRoutes);

// Подключение к базе данных
AppDataSource.initialize()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => {
        console.error('❌ Failed to connect to PostgreSQL', err);
        process.exit(1); // Остановит процесс при ошибке подключения
    });

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
