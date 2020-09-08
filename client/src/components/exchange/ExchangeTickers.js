import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectExchangeTickers,
  selecthasMoreTickers,
  fetchExchangeTickers,
} from "../../features/exchange/exchangeSlice";
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ExchangeTickers = ({ exchange_id }) => {
  const tickers = useSelector(selectExchangeTickers);
  const hasMoreTickers = useSelector(selecthasMoreTickers);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  if (tickers.length === 0) return <Fragment></Fragment>;

  return (
    <table className='main-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency</th>
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
                <img src={ticker.image && ticker.image} alt='' />
                <Link to={`/cryptocurrencies/${ticker.crypto_id}`}>
                  {ticker.name
                    ? ticker.name
                    : ticker.crypto_id.charAt(0).toUpperCase() +
                      ticker.crypto_id.slice(1)}
                </Link>
              </div>
            </td>
            <td>
              <a
                href={ticker.trade_url && ticker.trade_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {ticker.base ? ticker.base : "?"} /{" "}
                {ticker.target ? ticker.target : "?"}
              </a>
            </td>
            <td>
              $
              {ticker.price
                ? ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "?"}
            </td>
            <td className='ticker-spread'>
              {ticker.spread
                ? ticker.spread.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "?"}
              %
            </td>
            <td className='ticker-volume'>
              $
              {ticker.volume &&
              new Date() - new Date(ticker.last_traded_at) <= 86400000
                ? ticker.volume.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : "?"}
            </td>
            <td className='ticker-last-traded'>
              {ticker.last_traded_at
                ? new Date() - new Date(ticker.last_traded_at) <= 86400000
                  ? new Date(ticker.last_traded_at).toLocaleTimeString()
                  : new Date(ticker.last_traded_at).toDateString()
                : "?"}
            </td>
            <td className='table-waypoint'>
              {hasMoreTickers && index === tickers.length - 50 && (
                <Waypoint
                  onEnter={() => {
                    dispatch(fetchExchangeTickers(exchange_id, page + 1));
                    setPage(page + 1);
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ExchangeTickers.propTypes = { exchange_id: PropTypes.string };

export default ExchangeTickers;
