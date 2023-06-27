import React from 'react';
import { configProductImg } from '../../mocks/configProductImg';
import { IProductItemProps } from '../types';

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
