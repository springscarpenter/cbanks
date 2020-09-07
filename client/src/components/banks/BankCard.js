import React from 'react';
import PropTypes from 'prop-types';

const BankCard = ({ bank }) => {
  const { country, central_bank, title, image } = bank;

  return (
    <a
      href={`https://en.wikipedia.org/wiki/${
        title ? title : 'List_of_central_banks'
      }`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='card'>
        {country && (
          <p className='ranking'>
            <strong>{country[0].toUpperCase()}</strong>
          </p>
        )}
        <div className='card-info'>
          {image && <img src={image} alt='' />}
          {central_bank && (
            <span>
              <strong>{central_bank}</strong>
            </span>
          )}
          {country && <span>{country}</span>}
        </div>
      </div>
    </a>
  );
};

BankCard.propTypes = {
  bank: PropTypes.object.isRequired,
};

export default BankCard;
