import React from 'react';
import CurrentPrice from './CurrentPrice';
import CryptoMarketOverview from './CryptoMarketOverview';
import CryptoChartButtons from './CryptoChartButtons';
import CryptoChart from './CryptoChart';
import CryptoTickers from './CryptoTickers';

const CryptoMarketData = () => {
  return (
    <div className='market-data'>
      <CurrentPrice />
      <CryptoMarketOverview />
      <CryptoChartButtons />
      <CryptoChart />
      <CryptoTickers />
    </div>
  );
};

export default CryptoMarketData;
