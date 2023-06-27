import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Order from './components/Order';
import Cart from './components/Cart';

function App() {
  return (
    <Routes>
      <Route index element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
}

export default App;