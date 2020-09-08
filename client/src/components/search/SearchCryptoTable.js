import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchCryptoTable = ({ cryptoDefault, cryptoResult }) => {
  return (
    <table className='main-table lg-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency</th>
          <th>Symbol</th>
          {!cryptoResult && <th>Price</th>}
          {!cryptoResult && <th className='change-24h'>24h</th>}
          {!cryptoResult && <th className='change-7d'>7d</th>}
          {!cryptoResult && <th className='volume-24h'>24h Volume</th>}
          {!cryptoResult && <th className='market-cap'>Market Cap</th>}
        </tr>
      </thead>
      <tbody>
        {(cryptoResult || cryptoDefault).map((crypto, index) => (
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
            {!cryptoResult && (
              <td>
                $
                {crypto.current_price
                  ? crypto.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "?"}
              </td>
            )}
            {!cryptoResult && (
              <td
                className='change-24h'
                style={{
                  color:
                    crypto.price_change_percentage_24h > 0 ? "green" : "red",
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
                  : "?"}
                %
              </td>
            )}
            {!cryptoResult && (
              <td
                className='change-7d'
                style={{
                  color:
                    crypto.price_change_percentage_24h > 0 ? "green" : "red",
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
                  : "?"}
                %
              </td>
            )}
            {!cryptoResult && (
              <td className='volume-24h'>
                $
                {crypto.total_volume
                  ? crypto.total_volume.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "?"}
              </td>
            )}
            {!cryptoResult && (
              <td className='market-cap'>
                $
                {crypto.market_cap
                  ? crypto.market_cap.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "?"}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SearchCryptoTable.propTypes = {
  cryptoDefault: PropTypes.array.isRequired,
  cryptoResult: PropTypes.array,
};

export default SearchCryptoTable;
