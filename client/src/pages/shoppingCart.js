import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, ToastContainer, Toast, ListGroup, Form } from 'react-bootstrap';
import { fetchCart, removeFromCart, updateCartProductQuantity, updateUser } from '../http/productAPI';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
 
  const navigate = useNavigate(); 

  const cartId = 1; // тестовый cartId
  const [editingUser, setEditingUser] = useState({}); // локальный стейт для формы

  const loadCart = async () => {
    try {
      const data = await fetchCart(cartId);

      data.shopping_cart_products.sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );

      setCart(data);
      setEditingUser(data.user); 
    } catch (err) {
      console.error('Ошибка загрузки корзины:', err);
      showToastMessage('Ошибка загрузки корзины');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(cartId, productId);
      showToastMessage('Товар удален из корзины');
      loadCart();
    } catch (err) {
      console.error(err);
      showToastMessage('Ошибка при удалении товара');
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    const item = cart.shopping_cart_products.find(i => i.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    try {
      if (newQuantity < 1) {
        await removeFromCart(cartId, productId);
        showToastMessage('Товар удален из корзины');
      } else {
        await updateCartProductQuantity(cartId, productId, newQuantity);
        showToastMessage('Количество обновлено');
      }
      loadCart();
    } catch (err) {
      console.error(err);
      showToastMessage('Ошибка при обновлении количества');
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSave = async () => {
    try {
      await updateUser(editingUser.id, editingUser); 
      showToastMessage('Данные пользователя обновлены');
      loadCart(); 
    } catch (err) {
      console.error(err);
      showToastMessage('Ошибка при сохранении данных пользователя');
    }
  };

  if (!cart) return <p>Загрузка корзины...</p>;
  if (!cart.shopping_cart_products.length) return <p>Корзина пуста</p>;

  const total = cart.shopping_cart_products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
   
  const handleCheckout = () => {
    navigate("/order-details", { state: { cart, total } });
  };

  const user = cart.user || { name: 'Пользователь', email: '-', phone: '-', address: '-' };

  return (
    <div className="container mt-4">
      <h2>Моя корзина</h2>
      <Row className="mt-3">
        {/* Левая колонка - информация о пользователе */}
        <Col md={3}>
          <Card className="mb-3">
            <Card.Header>Информация о пользователе</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editingUser.name || ''}
                    onChange={handleUserChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editingUser.email || ''}
                    onChange={handleUserChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={editingUser.phone || ''}
                    onChange={handleUserChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Адрес</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={editingUser.address || ''}
                    onChange={handleUserChange}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUserSave}>
                  Сохранить
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Правая колонка - товары */}
        <Col md={9}>
          {cart.shopping_cart_products.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Row className="g-0 align-items-center">
                <Col md={4}>
                  <Card.Img
                    src={item.product.img}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={5}>
                  <Card.Body>
                    <Card.Title>{item.product.name}</Card.Title>
                    <Card.Text>Цена: {item.product.price} USD</Card.Text>
                    <Card.Text>
                      Количество:
                      <Button
                        size="sm"
                        variant="secondary"
                        className="ms-2 me-2"
                        onClick={() => handleQuantityChange(item.productId, -1)}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="ms-2"
                        onClick={() => handleQuantityChange(item.productId, 1)}
                      >
                        +
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={3} className="text-center">
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}

          {/* Нижний блок с суммой и кнопкой */}
          <Card className="mt-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5>Итого: {total} USD</h5>
              <Button variant="success" onClick={handleCheckout}>
                Оформить заказ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast уведомления */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} bg="success" onClose={() => setShowToast(false)}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ShoppingCart;
