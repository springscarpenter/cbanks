import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFiatChart,
  selectLoading,
  fetchFiat,
  resetDetails,
  setLoading,
} from '../features/fiatCurrency/fiatCurrencySlice';
import FiatProfile from '../components/fiatCurrency/FiatProfile';
import FiatMarketData from '../components/fiatCurrency/FiatMarketData';
import Loader from '../components/utils/Loader';
import NotFound from '../components/utils/NotFound';

const FiatCurrency = () => {
  const params = useParams();
  const chart = useSelector(selectFiatChart);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetDetails());
    dispatch(setLoading(true));
    dispatch(fetchFiat(params.id));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  if (chart === null) return <NotFound />;

  return (
    <div className='main-content-container'>
      <div className='details'>
        <FiatProfile />
        <FiatMarketData />
      </div>
    </div>
  );
};

export default FiatCurrency;
