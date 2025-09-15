const { ShoppingCart, ShoppingCartProduct, Product, User } = require('../models/models');

class CartController {
  // добавить в корзину
  async addToCart(req, res) {
  try {
    const { cartId, productId, quantity = 1 } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = cartId ? await ShoppingCart.findByPk(cartId) : null;
    if (!cart) cart = await ShoppingCart.create({ userId: 1 });

    let cartProduct = await ShoppingCartProduct.findOne({
      where: { shoppingCartId: cart.id, productId }
    });

    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      cartProduct = await ShoppingCartProduct.create({
        shoppingCartId: cart.id,
        productId,
        quantity
      });
    }

    return res.json({ cartId: cart.id, cartProduct });

  } catch (err) {
    console.error('AddToCart FULL ERROR:', err); // ✅ полный объект ошибки
    console.error('Error details:', err.errors || err.parent); // Sequelize специфичная инфо
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

  // получить корзину
 async getCart(req, res) {
    try {
      const { cartId } = req.params;

      const cart = await ShoppingCart.findByPk(cartId, {
        include: [
          {
            model: ShoppingCartProduct,
            include: [Product]
          },
          {
            model: User, // подтягиваем юзера
            attributes: ['id', 'name', 'email', 'phone', 'address'] // только нужные поля
          }
        ]
      });

      if (!cart) return res.status(404).json({ message: 'Cart not found' });

      return res.json(cart);
    } catch (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
  }


  // удалить товар
  async removeFromCart(req, res) {
    try {
      const { cartId, productId } = req.params;

      const cartProduct = await ShoppingCartProduct.findOne({
        where: { shoppingCartId: cartId, productId }
      });

      if (!cartProduct) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      await cartProduct.destroy();
      return res.json({ message: 'Removed from cart' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error removing from cart' });
    }
  }

  async updateQuantity(req, res) {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cartProduct = await ShoppingCartProduct.findOne({
      where: { shoppingCartId: cartId, productId }
    });

    if (!cartProduct) return res.status(404).json({ message: 'Product not found in cart' });

    cartProduct.quantity = quantity;
    await cartProduct.save();

    return res.json(cartProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating quantity', error: err.message });
  }
}

}



module.exports = new CartController();
