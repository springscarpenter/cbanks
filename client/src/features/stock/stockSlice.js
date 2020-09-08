import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const stockSlice = createSlice({
  name: 'stock',
  initialState: { symbol: null, quote: null, chart: null, loading: true },
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    fetchQuote: (state, action) => {
      state.quote = action.payload;
    },
    fetchChart: (state, action) => {
      state.chart = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetDetails: (state) => {
      state.symbol = null;
      state.quote = null;
      state.chart = null;
    },
  },
});

export const {
  setSymbol,
  fetchQuote,
  fetchChart,
  setLoading,
  resetDetails,
} = stockSlice.actions;

export const fetchStockData = (symbol) => async (dispatch) => {
  dispatch(resetDetails());
  dispatch(setLoading(true));
  dispatch(setSymbol(symbol));
  try {
    const quote = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FH_API_KEY}`
    );
    dispatch(fetchQuote(quote.data));
  } catch (err) {
    console.log(err.message);
  }
  try {
    const end = Math.floor(Date.now() / 1000);
    const start = end - 31557600;
    const chart = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${start}&to=${end}&token=${process.env.REACT_APP_FH_API_KEY}`
    );
    dispatch(
      fetchChart(
        chart.data.c.map((c, index) => ({
          x: chart.data.t[index] * 1000,
          y: c,
        }))
      )
    );
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const selectStockSymbol = (state) => state.stock.symbol;
export const selectStockQuote = (state) => state.stock.quote;
export const selectStockChart = (state) => state.stock.chart;
export const selectLoading = (state) => state.stock.loading;

export default stockSlice.reducer;
