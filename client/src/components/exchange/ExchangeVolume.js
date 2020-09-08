import React from 'react';
import { useSelector } from 'react-redux';
import { selectExchangeProfile } from '../../features/exchange/exchangeSlice';

const ExchangeVolume = () => {
  const { trade_volume_24h_btc } = useSelector(selectExchangeProfile);
  return (
    <div className='trade-volume'>
      <span>
        {trade_volume_24h_btc
          ? trade_volume_24h_btc.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '?'}{' '}
        BTC
      </span>
    </div>
  );
};

export default ExchangeVolume;
