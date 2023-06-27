import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../store/webShopThunks';
import { useAppDispatch, useAppSelector } from '../hook';
import { selectAllProducts, selectCartProducts, selectCurrentProducts } from '../store/webShopSelectors';
import ProductItem from './ProductItem';
import { addToCart, filterProducts, setAllFilterParams, sortProducts } from '../store/webShopSlice';
import { calculateCartProductsQuantity, getAttributes } from '../utils';
import { EAttributes, EProductAttributes, IChosenParams, IProduct } from '../types';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectAllProducts);
  const currentProducts = useAppSelector(selectCurrentProducts);
  const cartProducts = useAppSelector(selectCartProducts);
  const brands = getAttributes(allProducts, EProductAttributes.brand);
  const colors = getAttributes(allProducts, EProductAttributes.color);
  const [chosenParams, setChosenParams] = useState<IChosenParams>({
    brands: [],
    colors: [],
  });

  const cartProductsQuantity = calculateCartProductsQuantity(cartProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(setAllFilterParams({ brands, colors }));
  }, [brands, colors]);

  const onSort = (param: string) => () => {
    dispatch(sortProducts(param));
  };

  const onAttributeChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value, checked } = target;

    const chosenParamsByName = chosenParams[name as EAttributes];

    const newValues = (checked)
      ? [...chosenParamsByName, value]
      : chosenParamsByName.filter(paramValue => paramValue !== value);

    const newParams = { ...chosenParams, [name]: newValues };
    setChosenParams(newParams);
    dispatch(filterProducts(newParams));
  };

  const onProductClick = (product: IProduct) => () => {
    dispatch(addToCart(product));
  }

  return (
    <div>
      <h1 className='title'>Product List</h1>

      <div className='wrapper'>
        {(currentProducts.length) ?
          <ul className='products'>
            {currentProducts.map((product) => (
              <li key={product.id} className='products__item'>
                <ProductItem product={product} />
                <button className='btn-cart' onClick={onProductClick(product)}>add to cart</button>
              </li>
            ))}
          </ul>
          : <div className='products products_not-found'>No products found</div>
        }

        <div className='controls'>
          <div className='sorting'>
            <h2>Sort by:</h2>
            <button className='btn-sort' onClick={onSort('name')}>name</button> {/*todo: change to enum */}
            <button className='btn-sort' onClick={onSort('price')}>price</button>
          </div>

          <div className='filtering'>
            <h2>Filter by:</h2>

            <h3>Brands: </h3>
            {brands.map((brand: string) => (
              <div key={brand}>
                <input id={brand} type='checkbox' name={EAttributes.brands} value={brand} onChange={onAttributeChange} />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}

            <h3>Colors: </h3>
            {colors.map((color: string) => (
              <div key={color}>
                <input id={color} type='checkbox' name={EAttributes.colors} value={color} onChange={onAttributeChange} />
                <label htmlFor={color}>{color}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='link link_cart'>
          <Link to="/cart">GO TO CART</Link>
          {!!cartProductsQuantity && <div className='products-quantity'>{cartProductsQuantity}</div>}
        </div>
      </div>

      <div className='link'>
        <Link to="/cart">GO TO CART</Link>
      </div>
      <div className='link'>
        <Link to="/order">GO TO ORDER</Link>
      </div>
    </div>
  );
};

export default ProductList;