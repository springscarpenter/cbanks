import { createSlice } from '@reduxjs/toolkit';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

export const menuSlice = createSlice({
  name: 'menu',
  initialState: { menuOpen: !isMobile },
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export const selectMenu = (state) => state.menu.menuOpen;

export default menuSlice.reducer;
