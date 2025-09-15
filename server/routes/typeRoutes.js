const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

// POST / — создать новый продукт
router.post('/', typeController.create);

// GET / — получить все продукты
router.get('/', typeController.getAll);

module.exports = router;
