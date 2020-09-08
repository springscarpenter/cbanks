import React from 'react';
import FiatPrice from './FiatPrice';
import FiatChart from './FiatChart';

const FiatMarketData = () => {
  return (
    <div className='market-data'>
      <FiatPrice />
      <FiatChart />
    </div>
  );
};

export default FiatMarketData;
