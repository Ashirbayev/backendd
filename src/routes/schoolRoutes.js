const express = require("express");
const { AppDataSource } = require("../config/data-source");  // Подключение к источнику данных
const School = require("../models/School");

const router = express.Router();

// Получить все школы
router.get("/", async (req, res) => {
    const schools = await AppDataSource.getRepository(School).find();
    res.json(schools);
});



router.post('/', async (req, res) => {

    const { name } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(School);
        const newUser = userRepository.create({ name });  // Создаем нового пользователя
        await userRepository.save(newUser);  // Сохраняем пользователя в БД
        res.status(201).json(newUser);  // Возвращаем нового пользователя
    } catch (error) {
        console.log(error)
        res.status(500).send('Ошибка при добавлении пользователя');
    }
});



// Удалить школу
router.delete("/:id", async (req, res) => {
    await AppDataSource.getRepository(School).delete(req.params.id);
    res.json({ message: "Школа удалена" });
});

module.exports = router;
