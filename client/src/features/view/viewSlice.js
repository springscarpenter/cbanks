import { createSlice } from '@reduxjs/toolkit';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isMobile = vw < 600;

export const viewSlice = createSlice({
  name: 'view',
  initialState: { gridView: !isMobile },
  reducers: {
    toggleView: (state) => {
      state.gridView = !state.gridView;
    },
  },
});

export const { toggleView } = viewSlice.actions;

export const selectView = (state) => state.view.gridView;

export default viewSlice.reducer;
