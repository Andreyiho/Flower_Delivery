const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
})

const ShoppingCart = sequelize.define('shopping_cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
   
})  
const ShoppingCartProduct = sequelize.define('shopping_cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Coupon = sequelize.define('coupon', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, allowNull: false},
})




User.hasMany(ShoppingCart)
ShoppingCart.belongsTo(User)

ShoppingCart.hasMany(ShoppingCartProduct)
ShoppingCartProduct.belongsTo(ShoppingCart)

Product.hasMany(ShoppingCartProduct)
ShoppingCartProduct.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)
Coupon.hasMany(ShoppingCart)
ShoppingCart.belongsTo(Coupon)

module.exports = {
    User,
    ShoppingCart,
    ShoppingCartProduct,
    Product,
    Type,
    Coupon
}


