import React from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoProfile } from '../../features/cryptocurrency/cryptocurrencySlice';

const CurrentPrice = () => {
  const { current_price, price_change_percentage_24h } = useSelector(
    selectCryptoProfile
  );

  return (
    <div className='current-price'>
      <span>
        $
        {current_price
          ? current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '?'}
      </span>
      <span
        style={{
          color: price_change_percentage_24h > 0 ? 'green' : 'red',
        }}
      >
        {price_change_percentage_24h
          ? price_change_percentage_24h.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '?'}
        %
      </span>
    </div>
  );
};

export default CurrentPrice;
