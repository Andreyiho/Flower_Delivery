const Router = require('express');
const router = new Router();
const productontroller = require('../controllers/productController');

// создать новый продукт
router.post('/', productontroller.create);

// получить все продукты
    router.get('/', productontroller.getAll);

// получить продукт по ID
router.get('/:id', productontroller.getOne);

module.exports = router;
