import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchFiatTable = ({ fiatDefault, fiatResult, ratesDefault }) => {
  return (
    <table className='main-table lg-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency</th>
          <th className='fiat-ISO'>ISO Code</th>
          {fiatResult && <th>Country</th>}
          <th className='fiat-fractional-unit'>Fractional Unit</th>
          <th className='fiat-base'>Base</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {(fiatResult || fiatDefault).map((fiat, index) => (
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
                      .split(" ")
                      .join("_")}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {fiat.currency ? fiat.currency : fiat.ISO_code}
                  </a>
                )}
              </div>
            </td>
            <td className='fiat-ISO'>{fiat.ISO_code && fiat.ISO_code}</td>
            {fiatResult && <td>{fiat.state && fiat.state}</td>}
            <td className='fiat-fractional-unit'>
              {fiat.fractional_unit && fiat.fractional_unit}
            </td>
            <td className='fiat-base'>
              {fiat.number_to_basic && fiat.number_to_basic}
            </td>
            <td
              style={{
                fontWeight:
                  ratesDefault && ratesDefault[fiat.ISO_code] ? 500 : "normal",
              }}
            >
              $
              {ratesDefault && ratesDefault[fiat.ISO_code]
                ? (1 / ratesDefault[fiat.ISO_code]).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "?"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SearchFiatTable.propTypes = {
  fiatDefault: PropTypes.array.isRequired,
  fiatResult: PropTypes.array,
  ratesDefault: PropTypes.object,
};

export default SearchFiatTable;
