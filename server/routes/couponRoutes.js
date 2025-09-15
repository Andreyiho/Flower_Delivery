const Router = require('express');
const router = new Router();
const couponController = require('../controllers/couponController'); // или другая модель

// POST / — создать новый продукт
router.post('/', couponController.create);

// GET / — получить все продукты
router.get('/', couponController.getAll);

module.exports = router;
