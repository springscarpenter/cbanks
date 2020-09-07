import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState: { exchangeList: [], loading: true, hasMore: false },
  reducers: {
    fetchExchangeList: (state, action) => {
      state.exchangeList = [...state.exchangeList, ...action.payload];
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchExchangeList,
  setHasMore,
  setLoading,
} = exchangesSlice.actions;

export const fetchExchanges = (page) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges?page=${page}`
    );
    if (res.data && res.data.length > 1) {
      const data = res.data.map((exchange) => ({
        id: exchange.id,
        name: exchange.name,
        country: exchange.country,
        year_established: exchange.year_established,
        image: exchange.image,
        trust_score_rank: exchange.trust_score_rank,
        trade_volume_24h_btc: exchange.trade_volume_24h_btc,
        trade_volume_24h_btc_normalized:
          exchange.trade_volume_24h_btc_normalized,
      }));
      dispatch(fetchExchangeList(data));
      dispatch(setHasMore(true));
    } else {
      dispatch(setHasMore(false));
    }
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const selectExchanges = (state) => state.exchanges.exchangeList;
export const selectLoading = (state) => state.exchanges.loading;
export const selectHasMore = (state) => state.exchanges.hasMore;

export default exchangesSlice.reducer;
