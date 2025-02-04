const express = require('express');
const router = express.Router();
const { AppDataSource } = require("../config/data-source");  // Подключение к источнику данных
const User = require('../models/User');  // Модель для работы с пользователями
const Group = require('../models/Group');  // Модель для работы с группами
const School = require('../models/School');  // Модель для работы с школами
const { Op } = require('sequelize');



router.post('/', async (req, res) => {
    console.log(req.body)
    const { name, age, group_id } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create({ name, age, group_id });  // Создаем нового пользователя
        await userRepository.save(newUser);  // Сохраняем пользователя в БД
        res.status(201).json(newUser);  // Возвращаем нового пользователя
    } catch (error) {
        console.log(error)
        res.status(500).send('Ошибка при добавлении пользователя');
    }
});


// Маршрут для фильтрации пользователей через POST
router.post('/filter', async (req, res) => {
    const { userName, age, schoolId, groupId } = req.body;

    try {
        let users;

        // 1. Если есть только имя
        if (userName && !age && !schoolId && !groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('user.name ILIKE :name', { name: `%${userName}%` })
                .getMany();
        }
        // 2. Если есть только возраст
        else if (!userName && age && !schoolId && !groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('user.age = :age', { age })
                .getMany();
        }
        // 3. Если есть имя и возраст
        else if (userName && age && !schoolId && !groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('user.name ILIKE :name AND user.age = :age', { name: `%${userName}%`, age })
                .getMany();
        }
        // 4. Если есть школа
        else if (!userName && !age && schoolId && !groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('group.school_id = :schoolId', { schoolId })
                .getMany();
        }
        // 5. Если есть группа
        else if (!userName && !age && !schoolId && groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('user.group_id = :groupId', { groupId })
                .getMany();
        }
        // 6. Если есть группа и школа
        else if (!userName && !age && schoolId && groupId) {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .where('group.school_id = :schoolId AND user.group_id = :groupId', { schoolId, groupId })
                .getMany();
        }
        // 7. Если все фильтры равны null, вернуть всех пользователей
        else {
            users = await AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.group', 'group')
                .leftJoinAndSelect('group.school', 'school')
                .getMany();
        }

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при выполнении фильтрации' });
    }
});


module.exports = router;






// const { AppDataSource } = require("../config/data-source");  // Подключение к источнику данных
//
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
//
// // Получить всех пользователей
// // router.get('', async (req, res) => {
// //     const users = await AppDataSource.getRepository(User)
// //         .createQueryBuilder('user')
// //         .leftJoinAndSelect('user.group', 'group')
// //         .leftJoinAndSelect('group.school', 'school')
// //         .getMany();
// //     res.json(users);
// // });
//
//
//
// // Маршрут для фильтрации пользователей
// router.get('/filter', async (req, res) => {
//     const { schoolName, groupName, userName } = req.query;  // Получаем параметры из строки запроса
//
//     // Формируем запрос для фильтрации пользователей
//     let whereClause = {};
//
//     if (schoolName) {
//         whereClause['$group.school.name$'] = { [Op.iLike]: `%${schoolName}%` }; // Используем оператор iLike для поиска по имени школы
//     }
//     if (groupName) {
//         whereClause['$group.name$'] = { [Op.iLike]: `%${groupName}%` }; // Фильтрация по имени группы
//     }
//     if (userName) {
//         whereClause['name'] = { [Op.iLike]: `%${userName}%` }; // Фильтрация по имени пользователя
//     }
//
//     try {
//         const users = await User.findAll({
//             where: whereClause,
//             include: [
//                 {
//                     model: Group,
//                     include: [{ model: School }],
//                 },
//             ],
//         });
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Ошибка при фильтрации пользователей' });
//     }
// });
//
// router.post('/', async (req, res) => {
//     console.log(req.body)
//     const { name, age, group_id } = req.body;
//     try {
//         const userRepository = AppDataSource.getRepository(User);
//         const newUser = userRepository.create({ name, age, group_id });  // Создаем нового пользователя
//         await userRepository.save(newUser);  // Сохраняем пользователя в БД
//         res.status(201).json(newUser);  // Возвращаем нового пользователя
//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Ошибка при добавлении пользователя');
//     }
// });
//
//
// module.exports = router;
