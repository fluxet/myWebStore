import React from 'react';
import { Link } from 'react-router-dom';

const Order: React.FC = () => (
  <div>
    <h1 className='title'>Order: </h1>

    <div>
      <Link to="/">Back to Products</Link>
    </div>
    <div>
      <Link to="/cart">Back to Cart</Link>
    </div>
  </div>
)

export default Order;