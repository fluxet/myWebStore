import React from 'react';
import { IProduct } from '../store/webShopSlice';
import { configProductImg } from '../../mocks/configProductImg';

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  const { name, price, attributes } = product;
  const imgSrc = configProductImg[name];

  return (
    <div>
      <img src={imgSrc} />
      <div>{name}</div>
      <div>
        <span>brand: </span>
        <span>{attributes.brand}</span>
      </div>
      <div>{`price: ${price} $`}</div>
      <div>
        <span>color: </span>
        <span>{attributes.color}</span>
      </div>
    </div>
  )
}

export default ProductItem;
