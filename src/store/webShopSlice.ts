import { createSlice, current } from '@reduxjs/toolkit';
import { getProducts } from './webShopThunks';
import { normalizeValue } from '../utils';

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

interface IStoreState {
  allProducts: IProduct[];
  currentProducts: IProduct[];
  allFilterParams: {
    [EAttributes.brands]: string[];
    [EAttributes.colors]: string[];
  };
  cart: ICartProduct[];
  totalPrice: number;
}

const initialState: IStoreState = {
  allProducts: [],
  currentProducts: [],
  allFilterParams: {
    brands: [],
    colors: [],
  },
  cart: [],
  totalPrice: 0,
};

const webShopSlice = createSlice({
  name: 'webShop',
  initialState,
  reducers: {
    setAllFilterParams: (state, action) => {
      state.allFilterParams = action.payload;
    },
    sortProducts: (state, action) => {
      const sortParam = action.payload as TSortParam;
      state.currentProducts.sort((a, b) => normalizeValue(a[sortParam]) > normalizeValue(b[sortParam]) ? 1 : -1);
    },
    filterProducts: (state, action) => {
      const { brands, colors } = action.payload;

      const brandParams = (!!brands.length) ? brands : state.allFilterParams.brands;
      const colorParams = (!!colors.length) ? colors : state.allFilterParams.colors;

      state.currentProducts = state.allProducts
        .filter(({ attributes }) => colorParams.includes(attributes.color) && brandParams.includes(attributes.brand));
    },
    addToCart: (state, action) => {
      const selectedProduct = action.payload;
      const selectedProductInCart = state.cart.find(({ id }) => selectedProduct.id === id);

      if (selectedProductInCart) {
        selectedProductInCart.quantity += 1;
      } else {
        state.cart.push({ ...selectedProduct, quantity: 1 });
      }

      state.totalPrice += selectedProduct.price;
    },
    removeFromCart: (state, action) => {
      const selectedProductInCart = state.cart.find(({ id }) => id === action.payload);
      selectedProductInCart.quantity -= 1;
      state.totalPrice -= selectedProductInCart.price;

      if (!selectedProductInCart.quantity) {
        state.cart = state.cart.filter(({ id }) => id !== action.payload);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.currentProducts = action.payload;
    });
  }
});


export const { sortProducts, filterProducts, setAllFilterParams, addToCart, removeFromCart } = webShopSlice.actions;

export default webShopSlice.reducer;