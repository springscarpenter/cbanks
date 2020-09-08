import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchanges,
  selectHasMore,
  selectLoading,
  fetchExchanges,
} from '../../features/exchanges/exchangesSlice';
import { Waypoint } from 'react-waypoint';
import Loader from '../utils/Loader';

const ExchangeTable = () => {
  const exchanges = useSelector(selectExchanges);
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
            <th>Exchange</th>
            <th>Country</th>
            <th className='exchange-year'>Year Est.</th>
            <th className='volume-24h-btc'>24h Volume</th>
            <th className='volume-24h-btc-normalized'>
              24h Volume (Normalized)
            </th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className='table-img-link'>
                  <img src={exchange.image && exchange.image} alt='' />
                  <Link to={`/exchanges/${exchange.id}`}>
                    {exchange.name
                      ? exchange.name
                      : exchange.id.charAt(0).toUpperCase() +
                        exchange.id.slice(1)}
                  </Link>
                </div>
              </td>
              <td>{exchange.country && exchange.country}</td>
              <td className='exchange-year'>
                {exchange.year_established && exchange.year_established}
              </td>
              <td className='volume-24h-btc'>
                {exchange.trade_volume_24h_btc
                  ? exchange.trade_volume_24h_btc.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : '?'}{' '}
                BTC
              </td>
              <td className='volume-24h-btc-normalized'>
                {exchange.trade_volume_24h_btc_normalized
                  ? exchange.trade_volume_24h_btc_normalized.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )
                  : '?'}{' '}
                BTC
              </td>
              <td>
                {hasMore && index === exchanges.length - 50 && (
                  <Waypoint
                    onEnter={() => {
                      dispatch(fetchExchanges(page + 1));
                      setPage(page + 1);
                    }}
                  />
                )}
              </td>
              <td className='table-waypoint'>
                {hasMore && index === exchanges.length - 50 && (
                  <Waypoint
                    onEnter={() => {
                      dispatch(fetchExchanges(page + 1));
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

export default ExchangeTable;
