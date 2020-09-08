import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStockSymbol,
  selectLoading,
  fetchStockData,
} from '../features/stock/stockSlice';
import StockMarketData from '../components/stock/StockMarketData';
import Loader from '../components/utils/Loader';

const StockMarket = () => {
  const symbol = useSelector(selectStockSymbol);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (symbol === null) dispatch(fetchStockData('AAPL'));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='main-content-container'>
      <div className='details'>
        <StockMarketData />
      </div>
    </div>
  );
};

export default StockMarket;
