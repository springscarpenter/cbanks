import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoTickers } from '../../features/cryptocurrency/cryptocurrencySlice';
import { Link } from 'react-router-dom';

const CryptoTickers = () => {
  const tickers = useSelector(selectCryptoTickers);
  if (tickers === null) return <Fragment></Fragment>;

  return (
    <table className='main-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Exchange</th>
          <th>Pair</th>
          <th>Price</th>
          <th className='ticker-spread'>Spread</th>
          <th className='ticker-volume'>24h Volume</th>
          <th className='ticker-last-traded'>Last Traded</th>
        </tr>
      </thead>
      <tbody>
        {tickers.map((ticker, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div className='table-img-link'>
                <img
                  src={ticker.exchange_logo && ticker.exchange_logo}
                  alt=''
                />
                <Link to={`/exchanges/${ticker.exchange_id}`}>
                  {ticker.exchange && ticker.exchange}
                </Link>
              </div>
            </td>
            <td>
              <a
                href={ticker.trade_url && ticker.trade_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {ticker.base ? ticker.base : '?'} /{' '}
                {ticker.target ? ticker.target : '?'}
              </a>
            </td>
            <td>
              $
              {ticker.price
                ? ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '?'}
            </td>
            <td className='ticker-spread'>
              {ticker.spread
                ? ticker.spread.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '?'}
              %
            </td>
            <td className='ticker-volume'>
              $
              {ticker.volume &&
              new Date() - new Date(ticker.last_traded_at) <= 86400000
                ? ticker.volume.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : '?'}
            </td>
            <td className='ticker-last-traded'>
              {ticker.last_traded_at
                ? new Date() - new Date(ticker.last_traded_at) <= 86400000
                  ? new Date(ticker.last_traded_at).toLocaleTimeString()
                  : new Date(ticker.last_traded_at).toDateString()
                : '?'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTickers;
