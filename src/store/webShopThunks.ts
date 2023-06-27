import { createAsyncThunk } from '@reduxjs/toolkit';
import productsData from '../../mocks/products.json';

export const getProducts = createAsyncThunk(
  'webShop/getProducts',
  () => productsData,
);
