import React from 'react';
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addToCart } from '../http/productAPI'; 

const ProductItem = ({ product }) => {

  const handleAddToCart = async () => {
    if (!product.id) {
      console.warn('ProductId is missing!');
      return;
    }

    try {
      await addToCart(1, product.id, 1);
      console.log(`Добавлен товар с ID: ${product.id}`);

      // ✅ уведомление для пользователя
      alert(`Товар "${product.name}" успешно добавлен в корзину!`);

    } catch (err) {
      console.error('Ошибка добавления в корзину:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Ошибка при добавлении товара в корзину');
    }
  }

  return (
    <Col md={6}>
      <Card style={{ width: '18rem', cursor: 'pointer' }} border="light">
        <Card.Img width={400} height={300} variant="top" src={product.img} />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>{product.name}</Card.Title>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Text>{product.price} usd.</Card.Text>
            <Button onClick={handleAddToCart} variant="primary">Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
