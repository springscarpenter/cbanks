import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFiatDefault,
  selectRatesDefault,
  selectCryptoDefault,
  selectExchangeDefault,
  selectBankResult,
  selectFiatResult,
  selectCryptoResult,
  selectExchangeResult,
  selectLoading,
} from '../../features/search/searchSlice';
import BankCard from '../banks/BankCard';
import FiatCard from '../fiatCurrencies/FiatCard';
import CryptoCard from '../cryptocurrencies/CryptoCard';
import ExchangeCard from '../exchanges/ExchangeCard';
import Loader from '../utils/Loader';

const SearchGrid = () => {
  const fiatDefault = useSelector(selectFiatDefault);
  const ratesDefault = useSelector(selectRatesDefault);
  const cryptoDefault = useSelector(selectCryptoDefault);
  const exchangeDefault = useSelector(selectExchangeDefault);
  const bankResult = useSelector(selectBankResult);
  const fiatResult = useSelector(selectFiatResult);
  const cryptoResult = useSelector(selectCryptoResult);
  const exchangeResult = useSelector(selectExchangeResult);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='search-grid main-content-container'>
      <h1 className='site-description'>
        Cryptocurrency regulatory board and market data hub
      </h1>
      {bankResult && bankResult.length !== 0 && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Central Banks</span>
          </div>
          <div className='card-grid'>
            {bankResult.map((bank, index) => (
              <BankCard key={index} bank={bank}></BankCard>
            ))}
          </div>
        </Fragment>
      )}
      {fiatResult && fiatResult.length !== 0 && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Fiat Currencies</span>
          </div>
          <div className='card-grid'>
            {fiatResult.map((fiat, index) => (
              <FiatCard
                key={index}
                fiat={fiat}
                rate={ratesDefault ? ratesDefault[fiat.ISO_code] || -1 : -1}
                rateDefault={
                  ratesDefault ? ratesDefault[fiat.ISO_code] || -1 : -1
                }
              ></FiatCard>
            ))}
          </div>
        </Fragment>
      )}
      {!(cryptoResult && cryptoResult.length === 0) && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Cryptocurrencies</span>
          </div>
          <div className='card-grid'>
            {(cryptoResult || cryptoDefault).map((crypto, index) => (
              <CryptoCard key={index} crypto={crypto}></CryptoCard>
            ))}
          </div>
        </Fragment>
      )}
      {!(exchangeResult && exchangeResult.length === 0) && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Exchanges</span>
          </div>
          <div className='card-grid'>
            {(exchangeResult || exchangeDefault).map((exchange, index) => (
              <ExchangeCard key={index} exchange={exchange}></ExchangeCard>
            ))}
          </div>
        </Fragment>
      )}
      {!fiatResult && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Fiat Currencies</span>
          </div>
          <div className='card-grid'>
            {fiatDefault.map((fiat, index) => (
              <FiatCard
                key={index}
                fiat={fiat}
                rate={ratesDefault ? ratesDefault[fiat.ISO_code] || -1 : -1}
                rateDefault={
                  ratesDefault ? ratesDefault[fiat.ISO_code] || -1 : -1
                }
              ></FiatCard>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SearchGrid;
