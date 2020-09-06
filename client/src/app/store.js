import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import banksReducer from '../features/banks/banksSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    banks: banksReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
