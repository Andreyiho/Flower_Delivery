const Router = require('express');
const router = new Router();
const { User } = require('../models/models');
const userController = require('../controllers/userController');

// регистрация
router.post('/registration', userController.register);

// логин (шаблон, без проверки пароля пока)
router.post('/login', userController.login);

// проверка аутентификации
router.get('/auth', userController.check);

router.put('/:id', userController.updateUser);

module.exports = router;