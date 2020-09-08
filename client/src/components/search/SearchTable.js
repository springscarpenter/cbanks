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
import SearchBankTable from './SearchBankTable';
import SearchFiatTable from './SearchFiatTable';
import SearchCryptoTable from './SearchCryptoTable';
import SearchExchangeTable from './SearchExchangeTable';
import Loader from '../utils/Loader';

const SearchTable = () => {
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
          {bankResult.length !== 0 && (
            <SearchBankTable bankResult={bankResult} />
          )}
        </Fragment>
      )}
      {fiatResult && fiatResult.length !== 0 && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Fiat Currencies</span>
          </div>
          <SearchFiatTable
            fiatDefault={fiatDefault}
            fiatResult={fiatResult}
            ratesDefault={ratesDefault}
          />
        </Fragment>
      )}
      {!(cryptoResult && cryptoResult.length === 0) && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Cryptocurrencies</span>
          </div>
          <SearchCryptoTable
            cryptoDefault={cryptoDefault}
            cryptoResult={cryptoResult}
          />
        </Fragment>
      )}
      {!(exchangeResult && exchangeResult.length === 0) && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Exchanges</span>
          </div>
          <SearchExchangeTable
            exchangeDefault={exchangeDefault}
            exchangeResult={exchangeResult}
          />
        </Fragment>
      )}
      {!fiatResult && (
        <Fragment>
          <div className='search-title'>
            <i className='material-icons-outlined'>label</i>
            <span>Fiat Currencies</span>
          </div>
          <SearchFiatTable
            fiatDefault={fiatDefault}
            fiatResult={fiatResult}
            ratesDefault={ratesDefault}
          />
        </Fragment>
      )}
    </div>
  );
};

export default SearchTable;
