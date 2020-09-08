import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: false },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      state.darkMode
        ? document.body.classList.add('darkmode')
        : document.body.classList.remove('darkmode');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode;

export default themeSlice.reducer;
