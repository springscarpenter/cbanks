import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import searchReducer from '../features/search/searchSlice';
import banksReducer from '../features/banks/banksSlice';
import fiatCurrenciesReducer from '../features/fiatCurrencies/fiatCurrenciesSlice';
import cryptocurrenciesReducer from '../features/cryptocurrencies/cryptocurrenciesSlice';
import cryptocurrencyReducer from '../features/cryptocurrency/cryptocurrencySlice';
import exchangesReducer from '../features/exchanges/exchangesSlice';
import exchangeReducer from '../features/exchange/exchangeSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    search: searchReducer,
    banks: banksReducer,
    fiatCurrencies: fiatCurrenciesReducer,
    cryptocurrencies: cryptocurrenciesReducer,
    cryptocurrency: cryptocurrencyReducer,
    exchanges: exchangesReducer,
    exchange: exchangeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
