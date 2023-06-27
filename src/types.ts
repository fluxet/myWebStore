export enum EAttributes {
  colors = 'colors',
  brands = 'brands',
}

export enum EProductAttributes {
  color = 'color',
  brand = 'brand',
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  attributes?: {
    [EProductAttributes.brand]: string;
    [EProductAttributes.color]: string;
  };
}

export interface ICartProduct extends IProduct {
  quantity: number
}

export type TSortParam = 'name' | 'price';

export interface IStoreState {
  allProducts: IProduct[];
  currentProducts: IProduct[];
  allFilterParams: {
    [EAttributes.brands]: string[];
    [EAttributes.colors]: string[];
  };
  cart: ICartProduct[];
  totalPrice: number;
}

export interface IChosenParams {
  [EAttributes.brands]: string[];
  [EAttributes.colors]: string[];
}

export interface IProductItemProps {
  product: IProduct;
}