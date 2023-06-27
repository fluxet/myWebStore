import { EAttributes, EProductAttributes, ICartProduct, IProduct } from "./store/webShopSlice";

export const normalizeValue = (value: string | number) => (typeof value === 'string')
  ? value.toLowerCase()
  : value;

export const getAttributes = (products: IProduct[], param: EProductAttributes) => {
  const attributes = new Set();
  products.forEach(product => {
    attributes.add(product.attributes[param]);
  });
  return Array.from(attributes);
}

export const calculateCartProductsCapacity = (products: ICartProduct[]) => {

  return products.reduce((acc, product) => acc + product.capacity, 0);
}