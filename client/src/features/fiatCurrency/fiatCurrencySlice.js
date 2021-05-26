import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import fiatDB from '../../db/fiatDB';

export const fiatCurrencySlice = createSlice({
  name: 'fiatCurrency',
  initialState: {
    profile: null,
    chart: null,
    loading: true,
  },
  reducers: {
    fetchProfile: (state, action) => {
      state.profile = action.payload;
    },
    fetchChart: (state, action) => {
      state.chart = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetDetails: (state) => {
      state.profile = null;
      state.chart = null;
    },
  },
});

export const {
  fetchProfile,
  fetchChart,
  setLoading,
  resetDetails,
} = fiatCurrencySlice.actions;

export const fetchFiat = (id) => async (dispatch) => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = year + '-' + (month < 10 ? '0' + month : month) + '-' + day;
    const lastYear =
      year - 1 + '-' + (month < 10 ? '0' + month : month) + '-' + day;
    // const res = await axios.get(
    //   `https://api.exchangeratesapi.io/history?start_at=${lastYear}&end_at=${today}&symbols=USD&base=${id}`
    // );
    const res = await axios.get(
      `https://api.exchangerate.host/timeseries?start_date=${lastYear}&end_date=${today}&symbols=USD&base=${id}`
    );
    const chartData = Object.keys(res.data.rates).map((key) => ({
      x: new Date(key).getTime(),
      y: parseFloat(res.data.rates[key]['USD']),
    }));
    const sorted = chartData.sort((a, b) => a.x - b.x);
    dispatch(fetchChart({ base: res.data.base, data: sorted }));
    const profileData = fiatDB.find((fiat) => fiat.ISO_code === id);
    dispatch(fetchProfile(profileData));
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const selectFiatProfile = (state) => state.fiatCurrency.profile;
export const selectFiatChart = (state) => state.fiatCurrency.chart;
export const selectLoading = (state) => state.fiatCurrency.loading;

export default fiatCurrencySlice.reducer;
