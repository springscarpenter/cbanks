import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExchangeProfile,
  selectLoading,
  fetchExchangeProfile,
  fetchExchangeChart,
  fetchExchangeTickers,
  resetDetails,
  setLoading,
} from '../features/exchange/exchangeSlice';
import ExchangeProfile from '../components/exchange/ExchangeProfile';
import ExchangeMarketData from '../components/exchange/ExchangeMarketData';
import Loader from '../components/utils/Loader';
import NotFound from '../components/utils/NotFound';

const Exchange = () => {
  const params = useParams();
  const profile = useSelector(selectExchangeProfile);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetDetails());
    dispatch(setLoading(true));
    dispatch(fetchExchangeProfile(params.id));
    dispatch(fetchExchangeChart(params.id, '14'));
    dispatch(fetchExchangeTickers(params.id));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  if (profile === null) return <NotFound />;

  return (
    <div className='main-content-container'>
      <div className='details'>
        <ExchangeProfile />
        <ExchangeMarketData exchange_id={params.id} />
      </div>
    </div>
  );
};

export default Exchange;
