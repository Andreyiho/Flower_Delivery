const Router = require('express')
const router = new Router()
const userRouter = require('./userRoutes')
const productRouter = require('./productRoutes')
const typeRouter = require('./typeRoutes')
const couponRouter = require('./couponRoutes')
const cartRouter = require('./cartRoutes')


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)
router.use('/coupon',   couponRouter)
router.use('/cart', cartRouter)


module.exports = router