import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCryptoProfile,
  selectLoading,
  fetchCryptoProfile,
  fetchCryptoChart,
  resetDetails,
  setLoading,
} from '../features/cryptocurrency/cryptocurrencySlice';
import CryptoProfile from '../components/cryptocurrency/CryptoProfile';
import CryptoMarketData from '../components/cryptocurrency/CryptoMarketData';
import Loader from '../components/utils/Loader';
import NotFound from '../components/utils/NotFound';

const Cryptocurrency = () => {
  const params = useParams();
  const profile = useSelector(selectCryptoProfile);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetDetails());
    dispatch(setLoading(true));
    dispatch(fetchCryptoProfile(params.id));
    dispatch(fetchCryptoChart(params.id, 'max'));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  if (!profile) return <NotFound />;

  return (
    <div className='main-content-container'>
      <div className='details'>
        <CryptoProfile />
        <CryptoMarketData />
      </div>
    </div>
  );
};

export default Cryptocurrency;
