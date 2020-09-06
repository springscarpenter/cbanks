import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
