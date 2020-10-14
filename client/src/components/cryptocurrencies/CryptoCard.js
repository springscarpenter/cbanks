import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CryptoCard = ({ crypto }) => {
  const {
    id,
    market_cap_rank,
    symbol,
    name,
    image,
    current_price,
    price_change_percentage_24h,
  } = crypto;

  return (
    <Link to={`/cryptocurrencies/${id}`}>
      <div className='card'>
        <p className='ranking'>
          <strong>#{market_cap_rank && market_cap_rank}</strong>
        </p>
        <div className='card-info'>
          <img src={image && image} alt='' />
          <span>
            <strong>{symbol && symbol.toUpperCase()}</strong>
          </span>
          <span>{name && name}</span>
          <span>
            {current_price &&
              `$${current_price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
          </span>
          <span
            style={{
              color: price_change_percentage_24h > 0 ? 'green' : 'red',
            }}
          >
            {price_change_percentage_24h &&
              `${price_change_percentage_24h.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%`}
          </span>
        </div>
      </div>
    </Link>
  );
};

CryptoCard.propTypes = {
  crypto: PropTypes.object.isRequired,
};

export default CryptoCard;
