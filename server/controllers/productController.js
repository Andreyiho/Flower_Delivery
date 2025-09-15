const uuid = require('uuid');
const path = require('path');

const { Product } = require('../models/models'); 

class ProductController {
    async create(req, res) {
        const { name, price, typeId } = req.body;  
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))   
        const product = await Product.create({ name, price, typeId, img: fileName }); 
        return res.json(product);
    }
    async getAll(req, res) { 
        const { typeId } = req.query;
        let products;
        if (typeId) {
            products = await Product.findAndCountAll({ where: { typeId } });
        } else {
            products = await Product.findAndCountAll();
        }   
        return res.json(products);
    }
    async getOne(req, res) {    
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });
        return res.json(product);
    }



}
module.exports = new ProductController();
