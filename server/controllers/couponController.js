const { Coupon } = require('../models/models');

class CouponController {
    async create(req, res) {
        try {
            const { code, discount } = req.body;
            const coupon = await Coupon.create({ code, discount });
            res.status(201).json(coupon);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create coupon' });
        }   
    }
    async getAll(req, res) {
        try {
            const coupons = await Coupon.findAll();
            res.json(coupons);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch coupons' });
        }
    }


}
module.exports = new CouponController();
