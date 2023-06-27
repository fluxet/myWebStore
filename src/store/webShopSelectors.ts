import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectWebShop = (state: RootState) => state.webShop;

export const selectAllProducts = createSelector(
  selectWebShop,
  webShop => webShop.allProducts,
);

export const selectCurrentProducts = createSelector(
  selectWebShop,
  webShop => webShop.currentProducts,
);

export const selectCartProducts = createSelector(
  selectWebShop,
  webShop => webShop.cart,
);

export const selectTotalPrice = createSelector(
  selectWebShop,
  webShop => webShop.totalPrice,
);
