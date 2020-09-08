import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchangeID,
  selectExchangeChartRange,
  fetchExchangeChart,
} from '../../features/exchange/exchangeSlice';

const ExchangeChartButtons = () => {
  const exchangeID = useSelector(selectExchangeID);
  const range = useSelector(selectExchangeChartRange);
  const dispatch = useDispatch();

  const onClick = (e) => {
    if (e.target.id.slice(6) !== range)
      dispatch(fetchExchangeChart(exchangeID, e.target.id.slice(6)));
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
    </div>
  );
};

export default ExchangeChartButtons;
