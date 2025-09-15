import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/shop';
import Cart from '../pages/shoppingCart'; 
import OrderDetails from '../pages/order';



const AppRouter = () => {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>

  );
}
export default AppRouter;
 

