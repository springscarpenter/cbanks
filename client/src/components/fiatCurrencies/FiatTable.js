import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRatesDefault } from '../../features/search/searchSlice';
import {
  selectFiatCurrencies,
  selectRates,
  selectLoading,
} from '../../features/fiatCurrencies/fiatCurrenciesSlice';
import Loader from '../utils/Loader';

const FiatTable = () => {
  const fiatCurrencies = useSelector(selectFiatCurrencies);
  const rates = useSelector(selectRates);
  const ratesDefault = useSelector(selectRatesDefault);
  const loading = useSelector(selectLoading);

  return (
    <div className='main-content-container'>
      <table className='main-table lg-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Currency</th>
            <th className='fiat-ISO'>ISO Code</th>
            <th>Country</th>
            <th className='fiat-fractional-unit'>Fractional Unit</th>
            <th className='fiat-base'>Base</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {fiatCurrencies.map((fiat, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className='table-img-link'>
                  <span className='table-fiat-symbol'>
                    {fiat.symbol && fiat.symbol}
                  </span>
                  {ratesDefault && ratesDefault[fiat.ISO_code] ? (
                    <Link to={`/fiat-currencies/${fiat.ISO_code}`}>
                      {fiat.currency ? fiat.currency : fiat.ISO_code}
                    </Link>
                  ) : (
                    <a
                      href={`https://en.wikipedia.org/wiki/${fiat.currency
                        .split(' ')
                        .join('_')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {fiat.currency ? fiat.currency : fiat.ISO_code}
                    </a>
                  )}
                </div>
              </td>
              <td className='fiat-ISO'>{fiat.ISO_code && fiat.ISO_code}</td>
              <td>{fiat.state && fiat.state}</td>
              <td className='fiat-fractional-unit'>
                {fiat.fractional_unit && fiat.fractional_unit}
              </td>
              <td className='fiat-base'>
                {fiat.number_to_basic && fiat.number_to_basic}
              </td>
              <td
                style={{
                  fontWeight:
                    ratesDefault && ratesDefault[fiat.ISO_code]
                      ? 500
                      : 'normal',
                }}
              >
                $
                {rates && rates[fiat.ISO_code]
                  ? (1 / rates[fiat.ISO_code]).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '?'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loader />}
    </div>
  );
};

export default FiatTable;
