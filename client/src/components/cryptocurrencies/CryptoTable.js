import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptocurrencies,
  selectHasMore,
  selectLoading,
  fetchCryptocurrencies,
} from '../../features/cryptocurrencies/cryptocurrenciesSlice';
import { Waypoint } from 'react-waypoint';
import Loader from '../utils/Loader';

const CryptoTable = () => {
  const cryptocurrencies = useSelector(selectCryptocurrencies);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  return (
    <div className='main-content-container'>
      <table className='main-table lg-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Currency</th>
            <th>Symbol</th>
            <th>Price</th>
            <th className='change-24h'>24h</th>
            <th className='change-7d'>7d</th>
            <th className='volume-24h'>24h Volume</th>
            <th className='market-cap'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map((crypto, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className='table-img-link'>
                  <img src={crypto.image && crypto.image} alt='' />
                  <Link to={`/cryptocurrencies/${crypto.id}`}>
                    {crypto.name
                      ? crypto.name
                      : crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1)}
                  </Link>
                </div>
              </td>
              <td>{crypto.symbol && crypto.symbol.toUpperCase()}</td>
              <td>
                $
                {crypto.current_price
                  ? crypto.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '?'}
              </td>
              <td
                className='change-24h'
                style={{
                  color:
                    crypto.price_change_percentage_24h > 0 ? 'green' : 'red',
                }}
              >
                {crypto.price_change_percentage_24h
                  ? crypto.price_change_percentage_24h.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : '?'}
                %
              </td>
              <td
                className='change-7d'
                style={{
                  color:
                    crypto.price_change_percentage_24h > 0 ? 'green' : 'red',
                }}
              >
                {crypto.price_change_percentage_7d_in_currency
                  ? crypto.price_change_percentage_7d_in_currency.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : '?'}
                %
              </td>
              <td className='volume-24h'>
                $
                {crypto.total_volume
                  ? crypto.total_volume.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : '?'}
              </td>
              <td className='market-cap'>
                $
                {crypto.market_cap
                  ? crypto.market_cap.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : '?'}
              </td>
              <td className='table-waypoint'>
                {hasMore && index === cryptocurrencies.length - 50 && (
                  <Waypoint
                    onEnter={() => {
                      dispatch(fetchCryptocurrencies(page + 1));
                      setPage(page + 1);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loader />}
    </div>
  );
};

export default CryptoTable;
