import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import fiatDB from '../../db/fiatDB';

export const fiatCurrenciesSlice = createSlice({
  name: 'fiatCurrencies',
  initialState: {
    fiatList: [],
    rates: null,
    loading: true,
  },
  reducers: {
    fetchFiatList: (state, action) => {
      state.fiatList = [...state.fiatList, ...action.payload];
    },
    fetchRates: (state, action) => {
      state.rates = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchFiatList,
  fetchRates,
  setLoading,
} = fiatCurrenciesSlice.actions;

export const fetchFiatCurrencies = () => async (dispatch) => {
  try {
    dispatch(fetchFiatList(fiatDB));
  } catch (err) {
    console.log(err.message);
  }
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/forex/rates?base=USD&token=${process.env.REACT_APP_FH_API_KEY}`
    );
    dispatch(fetchRates(res.data.quote));
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const selectFiatCurrencies = (state) => state.fiatCurrencies.fiatList;
export const selectRates = (state) => state.fiatCurrencies.rates;
export const selectLoading = (state) => state.fiatCurrencies.loading;

export default fiatCurrenciesSlice.reducer;
