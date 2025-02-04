const express = require("express");
const { AppDataSource } = require ("../config/data-source");  // Подключение к источнику данных
const Group = require("../models/Group");
const School = require("../models/School");

const router = express.Router();

// Получить все группы
router.get("/", async (req, res) => {
    const groups = await AppDataSource.getRepository(Group).find({ relations: ["school"] });
    res.json(groups);
});

// Создать группу
// router.post("/", async (req, res) => {
//     const { name, school_id } = req.body;
//     const school = await AppDataSource.getRepository(School).findOneBy({ id: school_id });
//
//     if (!school) return res.status(404).json({ message: "Школа не найдена" });
//
//     const newGroup = new Group();
//     newGroup.name = name;
//     newGroup.school = school;
//
//     await AppDataSource.getRepository(Group).save(newGroup);
//     res.json(newGroup);
// });

router.post('/', async (req, res) => {
    console.log(req.body)
    const { name, school_id } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(Group);
        const newUser = userRepository.create({ name, school_id });  // Создаем нового пользователя
        await userRepository.save(newUser);  // Сохраняем пользователя в БД
        res.status(201).json(newUser);  // Возвращаем нового пользователя
    } catch (error) {
        console.log(error)
        res.status(500).send('Ошибка при добавлении пользователя');
    }
});

// Удалить группу
router.delete("/:id", async (req, res) => {
    await AppDataSource.getRepository(Group).delete(req.params.id);
    res.json({ message: "Группа удалена" });
});

module.exports = router;
