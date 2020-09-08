import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExchangeCard = ({ exchange }) => {
  const {
    id,
    name,
    country,
    image,
    trust_score_rank,
    trade_volume_24h_btc,
  } = exchange;

  return (
    <Link to={`/exchanges/${id}`}>
      <div className='card'>
        <p className='ranking'>
          <strong>#{trust_score_rank && trust_score_rank}</strong>
        </p>
        <div className='card-info'>
          <img src={image && image} alt='' />
          <span>
            <strong>{name && name}</strong>
          </span>
          <span>{country && country}</span>
          {trade_volume_24h_btc && (
            <span>
              {trade_volume_24h_btc.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{' '}
              BTC
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

ExchangeCard.propTypes = {
  exchange: PropTypes.object.isRequired,
};

export default ExchangeCard;
