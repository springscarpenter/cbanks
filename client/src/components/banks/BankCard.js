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
        <p className='ranking'>
          <strong>{country && country[0].toUpperCase()}</strong>
        </p>
        <div className='card-info'>
          <img src={image && image} alt='' />
          <span>
            <strong>{central_bank && central_bank}</strong>
          </span>
          <span>{country && country}</span>
        </div>
      </div>
    </a>
  );
};

BankCard.propTypes = {
  bank: PropTypes.object.isRequired,
};

export default BankCard;
