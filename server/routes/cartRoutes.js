const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')

// добавить в корзину
router.post('/add', cartController.addToCart)

// получить корзину по id
router.get('/:cartId', cartController.getCart)

// удалить товар
router.delete('/:cartId/:productId', cartController.removeFromCart)

router.put('/:cartId/product/:productId', cartController.updateQuantity);

module.exports = router