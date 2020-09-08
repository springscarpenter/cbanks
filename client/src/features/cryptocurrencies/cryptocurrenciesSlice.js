import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cryptocurrenciesSlice = createSlice({
  name: 'cryptocurrencies',
  initialState: { cryptoList: [], loading: true, hasMore: false },
  reducers: {
    fetchCryptoList: (state, action) => {
      state.cryptoList = [...state.cryptoList, ...action.payload];
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
  fetchCryptoList,
  setHasMore,
  setLoading,
} = cryptocurrenciesSlice.actions;

export const fetchCryptocurrencies = (page) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=7d`
    );
    if (res.data && res.data.length > 1) {
      const data = res.data.map((crypto) => ({
        id: crypto.id,
        market_cap_rank: crypto.market_cap_rank,
        symbol: crypto.symbol,
        name: crypto.name,
        image: crypto.image,
        total_volume: crypto.total_volume,
        market_cap: crypto.market_cap,
        current_price: crypto.current_price,
        price_change_percentage_24h: crypto.price_change_percentage_24h,
        price_change_percentage_7d_in_currency:
          crypto.price_change_percentage_7d_in_currency,
      }));
      dispatch(fetchCryptoList(data));
      dispatch(setHasMore(true));
    } else {
      dispatch(setHasMore(false));
    }
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const selectCryptocurrencies = (state) =>
  state.cryptocurrencies.cryptoList;
export const selectLoading = (state) => state.cryptocurrencies.loading;
export const selectHasMore = (state) => state.cryptocurrencies.hasMore;

export default cryptocurrenciesSlice.reducer;
