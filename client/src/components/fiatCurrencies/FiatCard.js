import React from 'react';
import PropTypes from 'prop-types';

const FiatCard = ({ fiat, rate }) => {
  const { state, currency, symbol, ISO_code } = fiat;
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const card = (
    <div className='card'>
      <p className='ranking'>
        <strong>{state ? state[0].toUpperCase() : ISO_code[0]}</strong>
      </p>
      <div className='card-info'>
        <div
          className='fiat-symbol'
          style={{
            borderColor: randomColor,
          }}
        >
          {symbol && symbol}
        </div>
        <span>
          <strong>{currency && currency}</strong>
        </span>
        <span>{ISO_code && ISO_code}</span>
        <span>{state && state}</span>
        <span>
          {rate !== -1 &&
            `USD ${(1 / rate).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
        </span>
      </div>
    </div>
  );
  return (
    <a
      href={`https://en.wikipedia.org/wiki/${currency.split(' ').join('_')}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {card}
    </a>
  );
};

FiatCard.propTypes = {
  fiat: PropTypes.object.isRequired,
  rate: PropTypes.number.isRequired,
};

export default FiatCard;
