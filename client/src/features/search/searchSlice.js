import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import bankDB from '../../db/bankDB';
import fiatDB from '../../db/fiatDB';
import cryptoDB from '../../db/cryptoDB';
import exchangeDB from '../../db/exchangeDB';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    bankResult: null,
    fiatResult: null,
    cryptoResult: null,
    exchangeResult: null,
    fiatDefault: [],
    ratesDefault: null,
    cryptoDefault: [],
    exchangeDefault: [],
    loading: true,
  },
  reducers: {
    searchBank: (state, action) => {
      state.bankResult = action.payload;
    },
    searchFiat: (state, action) => {
      state.fiatResult = action.payload;
    },
    searchCrypto: (state, action) => {
      state.cryptoResult = action.payload;
    },
    searchExchange: (state, action) => {
      state.exchangeResult = action.payload;
    },
    initFiat: (state, action) => {
      state.fiatDefault = action.payload;
    },
    initRates: (state, action) => {
      state.ratesDefault = action.payload;
    },
    initCrypto: (state, action) => {
      state.cryptoDefault = action.payload;
    },
    initExchange: (state, action) => {
      state.exchangeDefault = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetSearch: (state, action) => {
      state.bankResult = null;
      state.fiatResult = null;
      state.cryptoResult = null;
      state.exchangeResult = null;
    },
  },
});

export const {
  searchBank,
  searchFiat,
  searchCrypto,
  searchExchange,
  initFiat,
  initRates,
  initCrypto,
  initExchange,
  setLoading,
  resetSearch,
} = searchSlice.actions;

export const search = (text) => (dispatch) => {
  const regex = new RegExp(text.toLowerCase(), 'i');
  const bankRes = bankDB.filter(
    (bank) => regex.test(bank.country) || regex.test(bank.central_bank)
  );
  dispatch(searchBank(bankRes));
  const fiatRes = fiatDB.filter(
    (fiat) =>
      regex.test(fiat.state) ||
      regex.test(fiat.currency) ||
      regex.test(fiat.ISO_code)
  );
  dispatch(searchFiat(fiatRes));
  const cryptoRes = cryptoDB
    .filter((crypto) => regex.test(crypto.name) || regex.test(crypto.symbol))
    .map((crypto) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      image: crypto.image,
    }));
  dispatch(searchCrypto(cryptoRes));
  const exchangeRes = exchangeDB
    .filter(
      (exchange) => regex.test(exchange.name) || regex.test(exchange.country)
    )
    .map((exchange) => ({
      id: exchange.id,
      name: exchange.name,
      symbol: exchange.symbol,
      image: exchange.image,
      country: exchange.country,
    }));
  dispatch(searchExchange(exchangeRes));
  dispatch(setLoading(false));
};

export const initData = () => async (dispatch) => {
  try {
    const fiatDefaultList = [
      'BRL',
      'CAD',
      'CNY',
      'EUR',
      'GBP',
      'INR',
      'JPY',
      'KRW',
      'MYR',
      'RUB',
    ];
    dispatch(
      initFiat(
        fiatDefaultList.map((fiat) => {
          const c = fiatDB.find((f) => f.ISO_code === fiat);
          return {
            currency: c.currency,
            symbol: c.symbol,
            ISO_code: c.ISO_code,
            fractional_unit: c.fractional_unit,
            number_to_basic: c.number_to_basic,
          };
        })
      )
    );

    const [res1, res2, res3] = await Promise.all([
      axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=7d'
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1`
      ),
      axios.get('https://api.exchangeratesapi.io/latest?base=USD'),
    ]);

    const cryptoData = res1.data.map((crypto) => ({
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
    dispatch(initCrypto(cryptoData));

    const exchangeData = res2.data.map((exchange) => ({
      id: exchange.id,
      name: exchange.name,
      country: exchange.country,
      image: exchange.image,
      trust_score_rank: exchange.trust_score_rank,
      trade_volume_24h_btc: exchange.trade_volume_24h_btc,
      trade_volume_24h_btc_normalized: exchange.trade_volume_24h_btc_normalized,
    }));
    dispatch(initExchange(exchangeData));

    dispatch(initRates(res3.data.rates));
  } catch (err) {
    console.log(err);
  }
  dispatch(setLoading(false));
};

export const selectBankResult = (state) => state.search.bankResult;
export const selectFiatResult = (state) => state.search.fiatResult;
export const selectCryptoResult = (state) => state.search.cryptoResult;
export const selectExchangeResult = (state) => state.search.exchangeResult;
export const selectFiatDefault = (state) => state.search.fiatDefault;
export const selectRatesDefault = (state) => state.search.ratesDefault;
export const selectCryptoDefault = (state) => state.search.cryptoDefault;
export const selectExchangeDefault = (state) => state.search.exchangeDefault;
export const selectLoading = (state) => state.search.loading;

export default searchSlice.reducer;
