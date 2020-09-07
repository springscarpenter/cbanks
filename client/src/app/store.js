import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import banksReducer from '../features/banks/banksSlice';
import fiatCurrenciesReducer from '../features/fiatCurrencies/fiatCurrenciesSlice';
import cryptocurrenciesReducer from '../features/cryptocurrencies/cryptocurrenciesSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    banks: banksReducer,
    fiatCurrencies: fiatCurrenciesReducer,
    cryptocurrencies: cryptocurrenciesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
