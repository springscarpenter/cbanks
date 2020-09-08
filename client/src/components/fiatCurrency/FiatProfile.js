import React from 'react';
import { useSelector } from 'react-redux';
import { selectFiatProfile } from '../../features/fiatCurrency/fiatCurrencySlice';

const FiatProfile = () => {
  const {
    currency,
    symbol,
    ISO_code,
    fractional_unit,
    number_to_basic,
  } = useSelector(selectFiatProfile);
  return (
    <div className='profile'>
      <div className='profile-img fiat-profile-symbol'>
        <span className=''>{symbol && symbol}</span>
      </div>
      <div className='profile-name'>
        <h1>{currency && currency}</h1>
        <h3>{ISO_code && ISO_code}</h3>
      </div>
      <div className='profile-links'>
        {fractional_unit && (
          <div className='profile-link'>Fractional unit: {fractional_unit}</div>
        )}
        {number_to_basic && (
          <div className='profile-link'>Base: {number_to_basic}</div>
        )}
        {currency && (
          <div className='profile-link'>
            <i className='fas fa-link'></i>
            <a
              href={`https://en.wikipedia.org/wiki/${currency
                .split(' ')
                .join('_')}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiatProfile;
