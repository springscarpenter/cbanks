import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchExchangeTable = ({ exchangeDefault, exchangeResult }) => {
  return (
    <table className='main-table lg-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Exchange</th>
          <th>Country</th>
          {!exchangeResult && <th className='volume-24h-btc'>24h Volume</th>}
          {!exchangeResult && (
            <th className='volume-24h-btc-normalized'>
              24h Volume (Normalized)
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {(exchangeResult || exchangeDefault).map((exchange, index) => (
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
            {!exchangeResult && (
              <td className='volume-24h-btc'>
                {exchange.trade_volume_24h_btc
                  ? exchange.trade_volume_24h_btc.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "?"}{" "}
                BTC
              </td>
            )}
            {!exchangeResult && (
              <td className='volume-24h-btc-normalized'>
                {exchange.trade_volume_24h_btc_normalized
                  ? exchange.trade_volume_24h_btc_normalized.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )
                  : "?"}{" "}
                BTC
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SearchExchangeTable.propTypes = {
  exchangeDefault: PropTypes.array.isRequired,
  exchangeResult: PropTypes.array,
};

export default SearchExchangeTable;
