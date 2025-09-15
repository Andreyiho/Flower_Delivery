// src/pages/OrderDetails.js
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { cart, total } = location.state || {};

  if (!cart) {
    return <p>Нет данных о заказе</p>;
  }

  const orderId = Math.floor(Math.random() * 10000); // тестовый ID заказа
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Order Details</h2>
      <h5 className="text-center mb-4">Order #{orderId}</h5>

      <Card className="p-3">
        <ListGroup variant="flush">
          {cart.shopping_cart_products.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span>{item.product.name}</span>
              </div>
              <span>x {item.quantity}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />
        <div className="d-flex justify-content-between">
          <strong>Total:</strong>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="mt-2">
          <strong>Delivery Address:</strong> {cart.user?.address || "—"}
        </div>
        <div>
          <strong>Date:</strong>{" "}
          {deliveryDate.toLocaleDateString()}{" "}
          {deliveryDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;
