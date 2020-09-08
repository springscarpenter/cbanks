import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptoID,
  selectCryptoChartRange,
  fetchCryptoChart,
} from '../../features/cryptocurrency/cryptocurrencySlice';

const CryptoChartButtons = () => {
  const cryptoID = useSelector(selectCryptoID);
  const range = useSelector(selectCryptoChartRange);
  const dispatch = useDispatch();

  const onClick = (e) => {
    if (e.target.id.slice(6) !== range)
      dispatch(fetchCryptoChart(cryptoID, e.target.id.slice(6)));
  };
  return (
    <div className='chart-buttons'>
      <button
        className={range === '1' ? 'active' : undefined}
        onClick={onClick}
        id='range-1'
      >
        24h
      </button>
      <button
        className={range === '7' ? 'active' : undefined}
        onClick={onClick}
        id='range-7'
      >
        7d
      </button>
      <button
        className={range === '14' ? 'active' : undefined}
        onClick={onClick}
        id='range-14'
      >
        14d
      </button>
      <button
        className={range === '30' ? 'active' : undefined}
        onClick={onClick}
        id='range-30'
      >
        30d
      </button>
      <button
        className={range === '90' ? 'active' : undefined}
        onClick={onClick}
        id='range-90'
      >
        90d
      </button>
      <button
        className={range === '180' ? 'active' : undefined}
        onClick={onClick}
        id='range-180'
      >
        180d
      </button>
      <button
        className={range === '365' ? 'active' : undefined}
        onClick={onClick}
        id='range-365'
      >
        1y
      </button>
      <button
        className={range === 'max' ? 'active' : undefined}
        onClick={onClick}
        id='range-max'
      >
        Max
      </button>
    </div>
  );
};

export default CryptoChartButtons;
