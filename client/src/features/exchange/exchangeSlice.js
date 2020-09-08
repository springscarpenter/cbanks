import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cryptoDB from '../../db/cryptoDB';

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    id: null,
    profile: null,
    chart: null,
    range: null,
    tickers: [],
    loading: true,
    hasMoreTickers: false,
  },
  reducers: {
    setID: (state, action) => {
      state.id = action.payload;
    },
    fetchProfile: (state, action) => {
      state.profile = action.payload;
    },
    fetchChart: (state, action) => {
      state.chart = action.payload;
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
    fetchTickers: (state, action) => {
      state.tickers = [...state.tickers, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHasMoreTickers: (state, action) => {
      state.hasMoreTickers = action.payload;
    },
    resetDetails: (state) => {
      state.profile = null;
      state.chart = null;
      state.tickers = [];
    },
  },
});

export const {
  setID,
  fetchProfile,
  fetchChart,
  setRange,
  fetchTickers,
  setLoading,
  setHasMoreTickers,
  resetDetails,
} = exchangeSlice.actions;

export const fetchExchangeProfile = (id) => async (dispatch) => {
  dispatch(setID(id));
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges/${id}`
    );
    const data = {
      image: res.data.image,
      name: res.data.name,
      description: res.data.description,
      trust_score_rank: res.data.trust_score_rank,
      centralized: res.data.centralized,
      website: res.data.url,
      country: res.data.country,
      year: res.data.year_established,
      twitter: res.data.twitter_handle,
      facebook: res.data.facebook_url,
      telegram: res.data.telegram_url,
      reddit: res.data.reddit_url,
      slack: res.data.slack_url,
      other_url_1: res.data.other_url_1,
      other_url_2: res.data.other_url_2,
      trade_volume_24h_btc: res.data.trade_volume_24h_btc,
    };
    dispatch(fetchProfile(data));
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};

export const fetchExchangeChart = (id, range) => async (dispatch) => {
  dispatch(setRange(range));
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${range}`
    );
    const data = res.data.map((volume) => ({
      x: volume[0],
      y: parseFloat(volume[1]),
    }));
    dispatch(fetchChart(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchExchangeTickers = (id, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/exchanges/${id}/tickers?page=${page}&order=volume_desc`
    );
    if (res.data.tickers && res.data.tickers.length > 1) {
      const data = res.data.tickers.map((ticker) => {
        const crypto = cryptoDB.find((c) => c.id === ticker.coin_id) || {
          id: null,
          name: null,
          image: null,
        };
        return {
          id: crypto.id,
          name: crypto.name,
          image: crypto.image,
          crypto_id: ticker.coin_id,
          base: ticker.base,
          target: ticker.target,
          price: ticker.converted_last.usd,
          volume: ticker.converted_volume.usd,
          spread: ticker.bid_ask_spread_percentage,
          last_traded_at: ticker.last_traded_at,
          trade_url: ticker.trade_url,
        };
      });
      dispatch(fetchTickers(data));
      dispatch(setHasMoreTickers(true));
    } else {
      dispatch(setHasMoreTickers(false));
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const selectExchangeID = (state) => state.exchange.id;
export const selectExchangeProfile = (state) => state.exchange.profile;
export const selectExchangeChart = (state) => state.exchange.chart;
export const selectExchangeChartRange = (state) => state.exchange.range;
export const selectExchangeTickers = (state) => state.exchange.tickers;
export const selectLoading = (state) => state.exchange.loading;
export const selecthasMoreTickers = (state) => state.exchange.hasMoreTickers;

export default exchangeSlice.reducer;
