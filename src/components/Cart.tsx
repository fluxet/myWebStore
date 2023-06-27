import React from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { selectCartProducts, selectCurrentProducts, selectTotalPrice } from '../store/webShopSelectors';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../store/webShopSlice';

interface Product {
  id: number;
  name: string;
  price: number;
  attributes?: { // todo remove '?'
    color: string;
    type: string;
  }
}

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);
  const totalPrice = useAppSelector(selectTotalPrice);

  const onRemoveFromCartClick = (id: number) => () => {
    dispatch(removeFromCart(id));
  }

  return (
    <div>
      <h1 className='title'>Cart:</h1>

      <ul className='products'>
        {cartProducts.map((product) => (
          <li key={product.id} className='products__item'>
            <ProductItem product={product} />
            <div>
              <span>capacity:</span>
              <span>{product.capacity}</span>
            </div>
            <button className='btn-cart' onClick={onRemoveFromCartClick(product.id)}>remove from cart</button>
          </li>
        ))}
      </ul>

      <div className='total-price'>
        <span>TOTAL PRICE: </span>
        <span>{`${totalPrice} $`}</span>
      </div>

      <div>
        <Link to="/">Back to Products</Link>
      </div>
      <div>
        <Link to="/order">Go to Order</Link>
      </div>

    </div>
  );
};

export default Cart;