import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import banksReducer from '../features/banks/banksSlice';
import fiatCurrenciesReducer from '../features/fiatCurrencies/fiatCurrenciesSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    banks: banksReducer,
    fiatCurrencies: fiatCurrenciesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
